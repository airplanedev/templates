import {
  Form,
  Select,
  Stack,
  Table,
  TextInput,
  Title,
  Button,
  useComponentState,
  useTaskMutation,
} from "@airplane/views";
// airplane dev customer_onboarding_dashboard --host=api.airstage.app
const CustomerDashboard = () => {
  return (
    <Stack>
      <Title order={1}>Customer onboarding dashboard</Title>
      <Title order={2}>Create new account</Title>
      <CreateAccount />

      <Title order={2}>Step 1: Accounts requiring onboarding</Title>
      <Table
        title="Accounts"
        task="demo_list_account_filter"
        hiddenColumns={["country"]}
      />

      <Title order={2}>Step 2: Add users to account</Title>
      <AddUsers />

      <Title order={2}>Step 3: Choose deployment region</Title>
      <UpdateRegion />
    </Stack>
  );
};

const CreateAccount = () => {
  const { values: createAccountValues } =
    useComponentState("createAccountForm");

  const { mutate: createAccount } = useTaskMutation({
    slug: "demo_create_account_test",
    params: {
      ...createAccountValues,
    },
    onSuccess: (output) => {
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
        console.log("submitted");
        createAccount();
      }}
      resetOnSubmit
    >
      <TextInput id="company_name" label="Account Name" />
    </Form>
  );
};

const AddUsers = () => {
  const accountsState = useComponentState("accounts");
  const selectedAccount = accountsState.selectedRow;

  const user_name = useComponentState("userNameInput");
  const user_id = useComponentState("userIdInput");
  const title = useComponentState("titleInput");
  const role = useComponentState("roleInput");
  const email = useComponentState("emailInput");

  return (
    <Stack>
      <Table
        id="accounts"
        title="Accounts"
        task="demo_list_account_filter"
        rowSelection="single"
        hiddenColumns={["country"]}
      />

      {selectedAccount && (
        <Stack>
          <Title order={3}>Add user to "{selectedAccount.company_name}"</Title>
          <TextInput id="userIdInput" label="ID" />
          <TextInput id="userNameInput" label="Name" />
          <TextInput id="titleInput" label="Title" />
          <TextInput id="roleInput" label="Role" />
          <TextInput id="emailInput" label="Email" />
          <br />
          <Button
            id="createAccountButton"
            task={{
              slug: "demo_create_user_1",
              params: {
                user_id: user_id.value,
                account_id: selectedAccount.id,
                email: email.value,
                name: user_name.value,
                title: title.value,
                role: role.value,
              },
            }}
          >
            Add User to Account
          </Button>
        </Stack>
      )}
    </Stack>
  );
};

const UpdateRegion = () => {
  return (
    <Form
      onSubmit={(values) => {
        alert(`Submitted with values: ${JSON.stringify(values)}`);
      }}
    >
      <Select id="region" label="Region" data={["USA", "EU", "CA"]} />
    </Form>
  );
};

export default CustomerDashboard;
