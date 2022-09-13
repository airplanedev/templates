import {
  Stack,
  Table,
  Title,
  useComponentState,
  Card,
  Markdown,
  Button,
} from "@airplane/views";

// Views documentation: https://docs.airplane.dev/views/getting-started
const CustomerDashboard = () => {
  return (
    <Stack>
      <Title>Customer dashboard</Title>
      <Table title="Accounts" task="demo_list_accounts" />
    </Stack>
  );
};

export default CustomerDashboard;
