import {
  Button,
  Card,
  Markdown,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
  useComponentState,
} from "@airplane/views";
import { useState } from "react";

const UserImpersonation = () => {
  const [link, setLink] = useState("");
  const queryState = useComponentState();
  const tableState = useComponentState();
  const user = tableState.selectedRow;
  const reasonState = useComponentState("reason");
  return (
    <Stack>
      <Title>Impersonate a user</Title>
      <Text>
        🚨 Be cautious when impersonating users. Doing things inside a user's
        account can lead to noticeable, irreversible changes! All impersonation
        attempts are audited.
      </Text>
      <TextInput id={queryState.id} label="Search by ID, email, or team" />
      <Table
        id={tableState.id}
        title="Users"
        task={{
          slug: "demo_search_users",
          params: { query: queryState.value },
        }}
        columns={userCols}
        hiddenColumns={["id"]}
        rowSelection="single"
        showFilter={false}
      />
      {user && (
        <Card>
          <Stack>
            <Markdown>{`
## ${user.name}

- ID: ${user.id}
- Email: ${user.email}
          `}</Markdown>
            <TextInput id={reasonState.id} label="Reason (e.g. Intercom URL)" />
            <Button
              disabled={!reasonState.value}
              task={{
                slug: "demo_impersonate",
                params: { user_email: user.email, reason: reasonState.value },
                onSuccess: (o) => {
                  setLink(o.link);
                  reasonState.reset();
                },
              }}
            >
              Generate link
            </Button>
          </Stack>
        </Card>
      )}
      {user && link && (
        <Stack direction="row">
          <Button variant="outline" href={link}>
            Sign in as {user.email}
          </Button>
          (Hint: right click and open in incognito!)
        </Stack>
      )}
    </Stack>
  );
};

const userCols = [
  { label: "Name", accessor: "name" },
  { label: "Email", accessor: "email" },
  { label: "Role", accessor: "role" },
];

export default UserImpersonation;
