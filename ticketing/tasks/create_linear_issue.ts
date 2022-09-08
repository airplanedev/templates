import { LinearClient } from "@linear/sdk";

type Params = {
  title: string;
  team_id: string;
  assignee_id: string;
  description: string;
  priority: number;
};

export default async function (params: Params) {
  const apiKey = process.env.LINEAR_API_KEY ?? "";

  const client = new LinearClient({
    apiKey: apiKey,
  });

  const resp = await client.issueCreate({
    title: params.title,
    teamId: params.team_id,
    assigneeId: params.assignee_id,
    description: params.description,
    priority: params.priority,
  });

  return [{ success: resp.success, issueID: (await resp.issue)?.id }];
}
