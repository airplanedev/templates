import { Client, Operators, ConversationObject } from "intercom-client";

export default async function () {
  const token = process.env.INTERCOM_AUTH_TOKEN ?? "";

  const client = new Client({
    tokenAuth: {
      token: token,
    },
  });

  const resp = await client.conversations.search({
    data: {
      query: {
        field: "open",
        operator: Operators.EQUALS,
        value: "true",
      },
    },
  });

  const getConversationMetadata = async (c: ConversationObject) => {
    const admin = c.admin_assignee_id
      ? await client.admins.find({
          id: c.admin_assignee_id.toString(),
        })
      : null;
    const team = c.team_assignee_id
      ? await client.teams.find({ id: c.team_assignee_id.toString() })
      : null;

    const contact =
      (c as any).contacts.contacts.length > 0
        ? await client.contacts.find({
            id: (c as any).contacts.contacts[0].id.toString(),
          })
        : null;

    return {
      id: c.id,
      title: c.title,
      waitingSince: c.waiting_since
        ? new Date(c.waiting_since * 1000).toLocaleString()
        : "Not waiting",
      adminAssignee: admin ? admin.name : "",
      teamAssignee: team ? team.name : "",
      contactName: contact ? contact.name : "",
      contactEmail: contact ? contact.email : "",
    };
  };

  const conversationsMetadata = Promise.all(
    resp.conversations.map((c) => getConversationMetadata(c))
  );

  return conversationsMetadata;
}
