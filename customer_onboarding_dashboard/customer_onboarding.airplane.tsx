import {
  Form,
  Select,
  Stack,
  Table,
  TextInput,
  Title,
  useComponentState,
  useTaskMutation,
  Text,
  useTaskQuery,
  showNotification,
  Button,
} from "@airplane/views";
import airplane from "airplane";

const CustomerDashboard = () => {
  return (
    <Stack>
      <Title order={1}>Customer onboarding dashboard</Title>
      <Title order={2}>Create new account</Title>
      <CreateAccount />
      <Title order={2}>Onboard accounts</Title>
      <ExistingAccounts />
    </Stack>
  );
};

const CreateAccount = () => {
  const { values: createAccountValues } =
    useComponentState("createAccountForm");

  const { mutate: createAccount } = useTaskMutation({
    slug: "demo_create_account",
    params: {
      ...createAccountValues,
    },
    onSuccess: () => {
      showNotification({ message: "Created account!", type: "success" });
    },
    onError: (error) => {
      showNotification({
        message: `Failed creating account with error: ${error.message}`,
        type: "error",
      });
    },
    refetchTasks: ["demo_list_new_accounts"],
  });

  return (
    <Stack.Item width="1/2">
      <Form
        id="createAccountForm"
        onSubmit={() => {
          createAccount();
        }}
        resetOnSubmit
      >
        <TextInput id="company_name" label="Account name" required />
      </Form>
    </Stack.Item>
  );
};

const ExistingAccounts = () => {
  const accountsState = useComponentState("accounts");
  const selectedAccount = accountsState.selectedRow;
  return (
    <Stack>
      <Title order={3}>New accounts</Title>
      <Text size="lg">
        These accounts do not have users or regions. Select an account to finish
        onboarding.
      </Text>
      <Table
        id="accounts"
        showFilter={false}
        task="demo_list_new_accounts"
        rowSelection="single"
        columns={newAccountsCols}
        hiddenColumns={["country", "user_id"]}
      />
      {selectedAccount?.id && (
        <UpdateAccounts selectedAccountId={selectedAccount.id} />
      )}
    </Stack>
  );
};

const UpdateAccounts = ({ selectedAccountId }) => {
  return (
    <Stack>
      <Title order={3}>Finish onboarding</Title>
      <Stack direction="row">
        <Stack.Item width="1/2">
          <CreateUser accountId={selectedAccountId as string} />
        </Stack.Item>
        <Stack.Item width="1/2">
          <UpdateRegion accountId={selectedAccountId as string} />
        </Stack.Item>
      </Stack>
    </Stack>
  );
};

const CreateUser = ({ accountId }) => {
  const { values: createUserValues } = useComponentState("createUserForm");
  const { mutate: createUser } = useTaskMutation({
    slug: "demo_create_user",
    params: {
      ...createUserValues,
      account_id: accountId,
    },
    onSuccess: (output) => {
      showNotification({
        message: `Added user to account! ${JSON.stringify(output)}`,
        type: "success",
      });
    },
    onError: (error) => {
      showNotification({
        message: `Failed adding user with error:  ${JSON.stringify(error)}`,
        type: "error",
      });
    },
  });

  const { output } = useTaskQuery({ slug: "demo_list_new_accounts" });
  const userCount = output?.Q1.filter(
    (x) => x.id == accountId && x.user_id
  ).length;

  return (
    <Form
      id="createUserForm"
      onSubmit={() => {
        createUser();
      }}
      resetOnSubmit
    >
      <Title order={4}>Add users to company</Title>
      {userCount > 0 && (
        <Text>
          Found {userCount} existing user(s). Add more users, or add a
          deployment region to finish onboarding.
        </Text>
      )}
      {userCount == 0 && (
        <Text>This company has no users. Add one to get started.</Text>
      )}
      <TextInput label="Account ID" value={accountId} disabled required />
      <TextInput id="name" label="Name" required />
      <TextInput id="title" label="Title" required />
      <TextInput id="role" label="Role" required />
      <TextInput id="email" label="Email" required />
    </Form>
  );
};

const UpdateRegion = ({ accountId }) => {
  const { values: updateRegionValues } = useComponentState("updateRegionForm");

  const { mutate: updateRegion } = useTaskMutation({
    slug: "demo_update_region",
    params: {
      ...updateRegionValues,
      account_id: accountId,
    },
    onSuccess: () => {
      showNotification({
        message: `Added updating account region!`,
        type: "success",
      });
    },
    onError: (error) => {
      showNotification({
        message: `Failed updating account region: ${error}`,
        type: "error",
      });
    },
  });

  return (
    <Form
      id="updateRegionForm"
      onSubmit={() => {
        updateRegion();
      }}
      resetOnSubmit
    >
      <Title order={4}>Choose deployment region</Title>
      <TextInput label="Account ID" value={accountId} disabled required />
      <Select id="region" label="Region" data={["USA", "EU", "CA"]} required />
    </Form>
  );
};

const newAccountsCols = [
  {
    label: "ID",
    accessor: "id",
  },
  {
    label: "Company name",
    accessor: "company_name",
  },
  {
    label: "Signup date",
    accessor: "signup_date",
  },
];

export default airplane.view(
  {
    slug: "demo_customer_onboarding",
    name: "Customer onboarding",
    description: "Create and onboard new accounts",
  },
  CustomerDashboard
);
