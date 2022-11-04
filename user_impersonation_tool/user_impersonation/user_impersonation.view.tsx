import {
  Button,
  Dialog,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
  useComponentState,
} from "@airplane/views";
import { EyeIcon } from "@airplane/views/icons";
import { useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  title: string;
};

const UserImpersonation = () => {
  const [user, setUser] = useState<User | undefined>();
  const queryState = useComponentState();
  const dialogState = useComponentState();
  return (
    <Stack>
      <Title>Impersonate a user</Title>
      <Text>
        🚨 Be cautious when impersonating users. Doing things inside a user's
        account can lead to noticeable, irreversible changes! All impersonation
        attempts are audited.
      </Text>
      <TextInput id={queryState.id} label="Search by ID, email, or team" />
      <Table<User>
        title="Users"
        task={{
          slug: "demo_search_users",
          params: { query: queryState.value },
        }}
        columns={userCols}
        hiddenColumns={["id"]}
        showFilter={false}
        rowActions={[
          ({ row }) => (
            <Button
              preset="secondary"
              onClick={() => {
                setUser(row);
                dialogState.open();
              }}
              leftIcon={<EyeIcon />}
            >
              Impersonate
            </Button>
          ),
        ]}
      />
      <Dialog id={dialogState.id} title="Confirm impersonation">
        {user && <ImpersonationDialogPane user={user} />}
      </Dialog>
    </Stack>
  );
};

const ImpersonationDialogPane = ({ user }: { user: User }) => {
  const [link, setLink] = useState("");
  const reasonState = useComponentState();
  return (
    <>
      <Text>
        {`
#### ${user.name}
- **Email**: ${user.email}
- **Role**: ${user.role}
- **Title**: ${user.title}
- **ID**: ${user.id}`}
      </Text>
      <Stack>
        <TextInput id={reasonState.id} label="Reason (e.g. Intercom URL)" />
        <Button
          disabled={!reasonState.value}
          task={{
            slug: "demo_impersonate",
            params: { user_email: user.email, reason: reasonState.value },
            onSuccess: (o) => {
              setLink(o.link);
              reasonState.reset();
              reasonState.setDisabled(true);
            },
          }}
        >
          Generate impersonation link
        </Button>
        {link && (
          <>
            <Button variant="outline" href={link}>
              Sign in as {user.name}
            </Button>
            <Text italic color="gray">
              Hint: right-click and open in incognito mode
            </Text>
          </>
        )}
      </Stack>
    </>
  );
};

const userCols = [
  { label: "Name", accessor: "name" },
  { label: "Email", accessor: "email" },
  { label: "Role", accessor: "role" },
  { label: "Title", accessor: "title" },
];

export default UserImpersonation;
