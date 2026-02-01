import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-hub-signature-256',
}

interface GitHubIssueEvent {
  action: string;
  issue: {
    id: number;
    number: number;
    title: string;
    body: string | null;
    state: string;
    html_url: string;
    user: {
      login: string;
    };
    labels: Array<{ name: string }>;
  };
  repository: {
    id: number;
    name: string;
    full_name: string;
    owner: {
      login: string;
    };
  };
  sender: {
    login: string;
  };
}

async function verifySignature(payload: string, signature: string | null, secret: string): Promise<boolean> {
  if (!signature) return false;
  
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const signatureBytes = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
  const expectedSignature = 'sha256=' + Array.from(new Uint8Array(signatureBytes))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  
  return signature === expectedSignature;
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const webhookSecret = Deno.env.get('GITHUB_WEBHOOK_SECRET');

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const payload = await req.text();
    const signature = req.headers.get('x-hub-signature-256');
    const eventType = req.headers.get('x-github-event');

    // Verify webhook signature if secret is configured
    if (webhookSecret && !(await verifySignature(payload, signature, webhookSecret))) {
      console.error('Invalid webhook signature');
      return new Response(
        JSON.stringify({ error: 'Invalid signature' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const event = JSON.parse(payload);

    console.log(`Received GitHub event: ${eventType}, action: ${event.action}`);

    // Handle issue events
    if (eventType === 'issues') {
      const issueEvent = event as GitHubIssueEvent;
      
      // Check if this repo is connected
      const { data: repo, error: repoError } = await supabase
        .from('github_repos')
        .select('id, user_id, is_active')
        .eq('repo_name', issueEvent.repository.full_name)
        .single();

      if (repoError || !repo || !repo.is_active) {
        console.log(`Repo not found or inactive: ${issueEvent.repository.full_name}`);
        return new Response(
          JSON.stringify({ message: 'Repo not connected or inactive' }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Check for automation label
      const hasAutomationLabel = issueEvent.issue.labels.some(
        label => label.name.toLowerCase() === 'agentflow' || label.name.toLowerCase() === 'automate'
      );

      if (issueEvent.action === 'opened' || issueEvent.action === 'labeled') {
        if (hasAutomationLabel || issueEvent.action === 'opened') {
          // Create or update issue record
          const { error: issueError } = await supabase
            .from('issues')
            .upsert({
              github_issue_id: issueEvent.issue.id,
              repo_id: repo.id,
              issue_number: issueEvent.issue.number,
              issue_title: issueEvent.issue.title,
              issue_body: issueEvent.issue.body,
              issue_url: issueEvent.issue.html_url,
              status: 'pending',
              user_id: repo.user_id,
              repo_name: issueEvent.repository.full_name,
            }, {
              onConflict: 'github_issue_id'
            });

          if (issueError) {
            console.error('Error creating issue:', issueError);
            throw issueError;
          }

          console.log(`Issue ${issueEvent.issue.number} queued for processing`);
        }
      }

      if (issueEvent.action === 'closed') {
        // Update issue status
        const { error: updateError } = await supabase
          .from('issues')
          .update({ status: 'completed' })
          .eq('github_issue_id', issueEvent.issue.id);

        if (updateError) {
          console.error('Error updating issue:', updateError);
        }
      }
    }

    // Handle pull request events
    if (eventType === 'pull_request') {
      const prEvent = event;
      
      const { data: repo } = await supabase
        .from('github_repos')
        .select('id, user_id')
        .eq('repo_name', prEvent.repository.full_name)
        .single();

      if (repo) {
        // Find the related issue
        const { data: issue } = await supabase
          .from('issues')
          .select('id')
          .eq('repo_id', repo.id)
          .eq('issue_number', prEvent.pull_request.issue_url?.split('/').pop() || 0)
          .single();

        if (prEvent.action === 'opened' || prEvent.action === 'synchronize') {
          await supabase
            .from('pull_requests')
            .upsert({
              github_pr_id: prEvent.pull_request.id,
              repo_id: repo.id,
              issue_id: issue?.id,
              pr_number: prEvent.pull_request.number,
              pr_title: prEvent.pull_request.title,
              pr_url: prEvent.pull_request.html_url,
              status: 'open',
              user_id: repo.user_id,
            }, {
              onConflict: 'github_pr_id'
            });
        }

        if (prEvent.action === 'closed') {
          const status = prEvent.pull_request.merged ? 'merged' : 'closed';
          await supabase
            .from('pull_requests')
            .update({ status })
            .eq('github_pr_id', prEvent.pull_request.id);

          // Update related issue if PR was merged
          if (prEvent.pull_request.merged && issue) {
            await supabase
              .from('issues')
              .update({ status: 'completed' })
              .eq('id', issue.id);
          }
        }
      }
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
