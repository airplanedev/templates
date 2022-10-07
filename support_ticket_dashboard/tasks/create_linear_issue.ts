import { LinearClient } from "@linear/sdk";

type Params = {
  title: string;
  team_id: string;
  assignee_id: string;
  description: string;
  priority: string;
};

export default async function (params: Params) {
  const apiKey = process.env.LINEAR_API_KEY ?? "";

  // Return mock data if LINEAR_API_KEY is not set.
  // Delete this once you create a config variable for LINEAR_API_KEY and set
  // the environment variable.
  if (apiKey === "") {
    return [
      {
        success: true,
        issueID: "1",
      },
    ];
  }
  // End of mock data

  const client = new LinearClient({
    apiKey: apiKey,
  });

  const resp = await client.issueCreate({
    title: params.title,
    teamId: params.team_id,
    assigneeId: params.assignee_id,
    description: params.description,
    priority: parseInt(params.priority),
  });
  const issue = await resp.issue;
  return [{ success: resp.success, issueID: issue?.id }];
}
