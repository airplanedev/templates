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

// const INTERCOM_APP_ID = "we6lj1ka";
const INTERCOM_APP_ID = "";

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

  const { values: linearIssueFormValues } =
    useComponentState("linearIssueForm");

  const { setValue: setLinearIssueTitle } = useComponentState("title");
  const { setValue: setLinearIssueDescription } =
    useComponentState("description");

  const { mutate: createLinearIssue } = useTaskMutation({
    slug: "demo_create_linear_issue",
    params: {
      title: linearIssueFormValues.title,
      team_id: linearIssueFormValues.team,
      assignee_id: linearIssueFormValues.assignee,
      priority: parseInt(linearIssueFormValues.priority),
    },
    onSuccess: (output) => {
      alert(`Created Linear issue ${output[0].issueID}`);
    },
    onError: (error) => {
      alert(`Failed creating Linear issue with error: ${error.message}`);
    },
  });

  useEffect(() => {
    if (selectedConvo) {
      setLinearIssueTitle(
        `Issue created from Intercom conversation ${selectedConvo.id}`
      );
      setLinearIssueDescription(
        `
        Intercom conversation ID: ${selectedConvo.id}
        Conversation title: ${selectedConvo.title}
        Conversation has been waiting for a response since: ${
          selectedConvo.waitingSince
        }
        Conversation has been waiting for a response since: ${
          selectedConvo.waitingSince
        }
        Contact name: ${selectedConvo.contactName}
        Contact email: ${selectedConvo.contactEmail}
        Open in intercom: ${openInIntercomLink(selectedConvo.id)}
      `
      );
    }
  }, [selectedConvo]);

  const openInIntercomLink = (convoID: string) =>
    INTERCOM_APP_ID
      ? `https://app.intercom.com/a/apps/${INTERCOM_APP_ID}/inbox/inbox/all/conversations/${convoID}`
      : "https://www.intercom.com/";

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
              href={openInIntercomLink(row.id as string)}
            >
              Open in Intercom
            </Button>
          );
        }}
      />

      <Title order={5}>Assign an issue</Title>
      <Form
        id="linearIssueForm"
        onSubmit={() => {
          createLinearIssue();
          openConversationsState.clearSelection();
        }}
        resetOnSubmit={true}
      >
        <TextInput id="title" label="Linear issue title" />
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
          required
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
          required
        />
        <Select
          id="priority"
          label="Issue priority"
          data={[
            { value: "0", label: "None" },
            { value: "1", label: "Urgent" },
            { value: "2", label: "High" },
            { value: "3", label: "Medium" },
            { value: "4", label: "Low" },
          ]}
        />
        {/* TODO: replace with textarea component */}
        <TextInput id="description" label="Description" />
      </Form>
    </Stack>
  );
};

export default TicketingDashboard;
