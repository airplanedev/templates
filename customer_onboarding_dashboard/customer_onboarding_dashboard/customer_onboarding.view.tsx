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
} from "@airplane/views";

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
      alert(`Created Account!`);
    },
    onError: (error) => {
      alert(`Failed creating account issue with error: ${error.message}`);
    },
  });

  return (
    <Form
      id="createAccountForm"
      onSubmit={() => {
        createAccount();
      }}
      resetOnSubmit
    >
      <TextInput id="company_name" label="Account name" />
    </Form>
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
        task="demo_list_account"
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
      <Stack direction="row" grow>
        <CreateUser accountId={selectedAccountId as string} />
        <UpdateRegion accountId={selectedAccountId as string} />
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
      alert(`Added user to account! ${JSON.stringify(output)}`);
    },
    onError: (error) => {
      alert(`Failed adding user with error:  ${JSON.stringify(error)}`);
    },
  });

  const { output } = useTaskQuery({ slug: "demo_list_account" });
  const userCount = output?.Q1.filter(
    (x) => x.id == accountId && x.user_id
  ).length;
  return (
    <Form
      id="createUserForm"
      onSubmit={() => {
        createUser();
      }}
      width="1/2"
      resetOnSubmit
    >
      <Title order={3}>Add users to company</Title>
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
      alert(
        `Added updating account region! Successfully onboarded account ${accountId}.`
      );
    },
    onError: (error) => {
      alert(`Failed updating account region: ${error}`);
    },
  });

  return (
    <Form
      id="updateRegionForm"
      onSubmit={() => {
        updateRegion();
      }}
      width="1/2"
      resetOnSubmit
    >
      <Title order={3}>Choose deployment region</Title>
      <TextInput label="Account ID" value={accountId} disabled required />
      <Select id="region" label="Region" data={["USA", "EU", "CA"]} />
    </Form>
  );
};

const newAccountsCols = [
  {
    label: "ID",
    accessor: "id",
  },
  {
    label: "Company Name",
    accessor: "company_name",
  },
  {
    label: "Signup Date",
    accessor: "signup_date",
  },
];

export default CustomerDashboard;
