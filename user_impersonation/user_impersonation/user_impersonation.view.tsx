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
  const queryState = useComponentState("search");
  const tableState = useComponentState("users");
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
      <TextInput id="search" label="Search by ID, email, or team" />
      <Table
        id="users"
        title="Users"
        task={{ slug: "search_users", params: { query: queryState.value } }}
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
            <TextInput id="reason" label="Reason (e.g. Intercom URL)" />
            <Button
              disabled={!reasonState.value}
              task={{
                slug: "impersonate",
                params: { user_email: user.email, reason: reasonState.value },
                onSuccess: (o) => {
                  setLink(o.link);
                  reasonState.setValue("");
                },
              }}
            >
              Generate link
            </Button>
          </Stack>
        </Card>
      )}
      {link && (
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

export default UserImpersonation;
