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
    </Stack>
  );
};

export default TicketingDashboard;
