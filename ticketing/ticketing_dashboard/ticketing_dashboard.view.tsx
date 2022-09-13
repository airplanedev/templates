import {
  Column,
  Stack,
  Table,
  Title,
  useComponentState,
  Button,
  Select,
  TextInput,
  Form,
  // Textarea,
  useTaskMutation,
} from "@airplane/views";
import { useEffect } from "react";

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

  const defaultTitle = selectedConvo?.id
    ? `Linear issue created from intercom conversation ${selectedConvo?.id}`
    : "";
  const linearIssueFormValues = useComponentState("linearIssueForm").values;

  const { mutate: createLinearIssue } = useTaskMutation({
    slug: "demo_create_linear_issue",
    params: {
      title: linearIssueFormValues.title,
      team_id: linearIssueFormValues.team,
      assignee_id: linearIssueFormValues.assignee,
      priority: linearIssueFormValues.priority,
    },
    onSuccess: (output) => {
      alert(`Created linear issue ${output[0].issueID}`);
    },
  });

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

      <Title order={5}>Assign a linear issue</Title>
      <Form
        id="linearIssueForm"
        onSubmit={() => {
          createLinearIssue();
        }}
        resetOnSubmit={true}
      >
        <TextInput
          id="title"
          label="Linear issue title"
          defaultValue={defaultTitle}
        />
        <Select
          id="team"
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
          id="assignee"
          label="Linear assignee"
          task="demo_list_linear_users"
          outputTransform={(users) =>
            users.map((u) => ({
              value: u.id,
              label: u.name,
            }))
          }
        />
        <Select
          id="priority"
          label="Issue priority"
          data={[
            { value: 0, label: "None" },
            { value: 1, label: "Urgent" },
            { value: 2, label: "High" },
            { value: 3, label: "Medium" },
            { value: 4, label: "Low" },
          ]}
        />
        {/* <Textarea id="description" label="Description" /> */}
      </Form>
    </Stack>
  );
};

export default TicketingDashboard;
