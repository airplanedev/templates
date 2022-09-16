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
} from "@airplane/views";

const CustomerDashboard = () => {
  return (
    <Stack>
      <Title order={1}>Customer onboarding dashboard</Title>
      <Title order={2}>Create new account</Title>
      <CreateAccount />

      <Title order={2}>Onboard accounts</Title>
      <OnboardCompany />
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
        console.log("submitted");
        createAccount();
      }}
      resetOnSubmit
    >
      <TextInput id="company_name" label="Account Name" />
    </Form>
  );
};

const OnboardCompany = () => {
  const { values: createUserValues } = useComponentState("createUserForm");

  const accountsState = useComponentState("accounts");
  const selectedAccount = accountsState.selectedRow;
  const { mutate: createUser } = useTaskMutation({
    slug: "demo_create_user",
    params: {
      ...createUserValues,
      account_id: selectedAccount?.id,
    },
    onSuccess: (output) => {
      alert(`Added user to account! ${JSON.stringify(output)}`);
    },
    onError: (error) => {
      alert(`Failed adding user with error:  ${JSON.stringify(error)}`);
    },
  });

  return (
    <Stack>
      <Title order={3}>New accounts</Title>
      <Text size="lg">These accounts do not have users or regions. Select an account to finish onboarding.</Text>
      <Table
        id="accounts"
        task="demo_list_account"
        rowSelection="single"
        hiddenColumns={["country"]}
      />
  
      {selectedAccount?.id && (
        <Stack>
          <Form
            id="createUserForm"
            onSubmit={() => {
              createUser();
            }}
          >
            <Title order={3}>Add user to company</Title>
            <div>
              <TextInput
                label="Account ID"
                value={selectedAccount?.id}
                disabled
                required
              />
              <TextInput id="user_id" label="User ID" required />
              <TextInput id="name" label="Name" required />
              <TextInput id="title" label="Title" required />
              <TextInput id="role" label="Role" required />
              <TextInput id="email" label="Email" required />
            </div>
          </Form>
          <UpdateRegion accountId={selectedAccount?.id as string} />
        </Stack>
      )}
    </Stack>
  );
};

const UpdateRegion = (props: { accountId: string }) => {
  const { accountId } = props;
  const { values: updateRegionValues } = useComponentState("updateRegionForm");

  const { mutate: updateRegion } = useTaskMutation({
    slug: "demo_update_region",
    params: {
      ...updateRegionValues,
      account_id: accountId,
    },
    onSuccess: (output) => {
      alert(`Added user to account! ${JSON.stringify(output)}`);
    },
    onError: (error) => {
      alert(`Failed adding user with error:  ${JSON.stringify(error)}`);
    },
  });

  return (
    <Stack>
      <Form
        id="updateRegionForm"
        onSubmit={(values) => {
          updateRegion();
        }}
      >
        <Title order={3}>Choose deploy region</Title>
        <TextInput
          label="Account ID"
          value={accountId}
          disabled
          required
        />{" "}
        <Select id="region" label="Region" data={["USA", "EU", "CA"]} />
      </Form>
    </Stack>
  );
};

export default CustomerDashboard;
