import { LinearClient } from "@linear/sdk";

export default async function () {
  const apiKey = process.env.LINEAR_API_KEY ?? "";

  const client = new LinearClient({
    apiKey: apiKey,
  });

  const resp = await client.teams();

  const teams = resp.nodes.map((t) => ({ name: t.name, id: t.id }));

  return teams;
}
