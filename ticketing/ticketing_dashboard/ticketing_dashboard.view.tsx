import {
  Column,
  Stack,
  Table,
  Text,
  Title,
  Card,
  Markdown,
  useComponentState,
  Button,
  Select,
  TextInput,
} from "@airplane/views";

// Put the main logic of the view here.
// Views documentation: https://docs.airplane.dev/views/getting-started
const TicketingDashboard = () => {
  const openConversationsCols: Column[] = [
    { label: "Title", accessor: "title" },
    { label: "Waiting since", accessor: "waitingSince" },
    { label: "Admin assignee", accessor: "adminAssignee" },
    { label: "Team assignee", accessor: "teamAssignee" },
    { label: "Contact name", accessor: "contactName" },
    { label: "Contact email", accessor: "contactEmail" },
  ];
  const openConversationsState = useComponentState("openConversations");
  const selectedConvo = openConversationsState.selectedRow;

  const linearTeamState = useComponentState("linearTeam");
  const selectedLinearTeam = linearTeamState.value;

  const linearAssigneeState = useComponentState("linearAssignee");
  const selectedLinearAssignee = linearAssigneeState.value;

  const linearIssueTitle = useComponentState("linearIssueTitle").value;

  console.log(linearAssigneeState);
  console.log(linearTeamState);

  return (
    <Stack>
      <Title>Ticketing dashboard</Title>
      <Table
        id="openConversations"
        title="Open Intercom conversations"
        task="demo_list_open_intercom_conversations"
        rowSelection="single"
        columns={openConversationsCols}
        hiddenColumns={["id"]}
        rowActions={(row) => {
          return (
            <Button
              preset="secondary"
              compact
              size="sm"
              href={`https://app.intercom.com/a/apps/we6lj1ka/inbox/inbox/all/conversations/${row.id}`}
            >
              Open in Intercom
            </Button>
          );
        }}
      />
      {selectedConvo && (
        <>
          <Title>Assign a linear issue</Title>
          <TextInput
            id="linearIssueTitle"
            label="Linear issue title"
            defaultValue={`Linear issue created from intercom conversation ${selectedConvo?.id}`}
          />
          <Select
            id="linearTeam"
            label="Linear team"
            task="demo_list_linear_teams"
            outputTransform={(teams) =>
              teams.map((t) => ({
                value: t.id,
                label: t.name,
              }))
            }
          />
          <Select
            id="linearAssignee"
            label="Linear assignee"
            task="demo_list_linear_users"
            outputTransform={(users) =>
              users.map((u) => ({
                value: u.id,
                label: u.name,
              }))
            }
          />
          {selectedLinearTeam && selectedLinearAssignee && (
            <Button
              task={{
                slug: "demo_create_linear_issue",
                params: {
                  title: linearIssueTitle,
                  team_id: selectedLinearTeam,
                  assignee_id: selectedLinearAssignee,
                },
              }}
            >
              Create issue
            </Button>
          )}
        </>
      )}
    </Stack>
  );
};

export default TicketingDashboard;
