import { Client, Operators, ConversationObject } from "intercom-client";

export default async function () {
  const token = process.env.INTERCOM_AUTH_TOKEN ?? "";

  // Return mock data if INTERCOM_AUTH_TOKEN is not set.
  // Delete this once you create a config variable for INTERCOM_AUTH_TOKEN and set the environment variable.
  if (token === "") {
    return [
      {
        id: "1",
        title: "Help with locating past order",
        waitingSince: "9/12/2022, 7:44:14 AM",
        adminAssignee: "John Smith",
        teamAssignee: "Customer Support",
        contactName: "Carolyn Garcia",
        contactEmail: "Golf Partners",
      },
      {
        id: "2",
        title: "Bug in CLI",
        waitingSince: "8/15/2022, 2:51:01 PM",
        adminAssignee: "Jane Doe",
        teamAssignee: "Eng",
        contactName: "Roy Hernandez",
        contactEmail: "Blue Sky Corp",
      },
      {
        id: "3",
        title: "Assistance with return",
        waitingSince: "Not waiting",
        adminAssignee: "John Smith",
        teamAssignee: "Customer Support",
        contactName: "Steven Williams",
        contactEmail: "Blue Sky Corp",
      },
      {
        id: "4",
        title: "Checking in on status of order",
        waitingSince: "Not waiting",
        adminAssignee: "John Smith",
        teamAssignee: "Customer Support",
        contactName: "Elijah Anderson",
        contactEmail: "Indigo Sky Ltd",
      },
      {
        id: "5",
        title: "API key is not working",
        waitingSince: "8/24/2022, 9:34:03 PM",
        adminAssignee: "Jane Doe",
        teamAssignee: "Eng",
        contactName: "Carolyn Garcia",
        contactEmail: "Golf Partners",
      },
    ];
  }
  // End of mock data

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
