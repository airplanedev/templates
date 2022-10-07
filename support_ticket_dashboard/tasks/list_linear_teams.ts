import { LinearClient } from "@linear/sdk";

export default async function () {
  const apiKey = process.env.LINEAR_API_KEY ?? "";

  // Return mock data if LINEAR_API_KEY is not set.
  // Delete this once you create a config variable for LINEAR_API_KEY and set
  // the environment variable.
  if (apiKey === "") {
    return [
      {
        name: "Engineering",
        id: "1",
      },
      {
        name: "Design",
        id: "2",
      },
      {
        name: "Customer Support",
        id: "3",
      },
      {
        name: "Growth",
        id: "4",
      },
    ];
  }
  // End of mock data

  const client = new LinearClient({
    apiKey: apiKey,
  });

  const resp = await client.teams();

  const teams = resp.nodes.map((t) => ({ name: t.name, id: t.id }));

  return teams;
}
