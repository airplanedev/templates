import {
  Button,
  Stack,
  Table,
  Text,
  Title,
  TextInput,
  Card,
  useComponentState,
  Divider,
} from "@airplane/views";

const Dashboard = () => {
  const searchKeyword = useComponentState("searchKeyword");
  const customersTable = useComponentState("customers");
  const selectedCustomer = customersTable.selectedRow;

  return (
    <Stack>
      <Title>Admin panel</Title>
      <Text>
        Look up a customer, edit customer details, view orders for that
        customer, and edit order details.
      </Text>
      <Stack direction="row" align="end">
        <TextInput id="searchKeyword" label="Search for a customer" />
      </Stack>
      <Stack direction="row" align="center">
        <Table
          id="customers"
          title="Customers"
          columns={customersCols}
          task={{
            slug: "demo_search_customers",
            params: { search_keyword: searchKeyword.value },
          }}
          rowSelection="single"
          showFilter={false}
          hiddenColumns={["address", "city", "postal_code"]}
        />
        {selectedCustomer && (
          <CustomerCard
            selectedCustomer={selectedCustomer}
            searchKeyword={searchKeyword}
          />
        )}
      </Stack>
      {selectedCustomer && (
        <Stack>
          <Table
            title={`Orders for ${selectedCustomer.company_name}`}
            task={{
              slug: "demo_list_customer_orders",
              params: { customer_id: selectedCustomer.customer_id },
            }}
            columns={ordersCols}
            rowActions={[
              {
                slug: "demo_update_ship_address",
                label: "Update address",
              },
            ]}
          />
        </Stack>
      )}
    </Stack>
  );
};

const CustomerCard = ({ selectedCustomer, searchKeyword }) => {
  const contactName = useComponentState("contactNameInput");

  return (
    <Card>
      <Title order={3}>{selectedCustomer.company_name}</Title>
      <Text>
        {selectedCustomer.address}
        <br />
        {selectedCustomer.city}, {selectedCustomer.country},{" "}
        {selectedCustomer.postal_code}
      </Text>
      <Stack>
        <Divider />
        <Title order={5}>Update point of contact</Title>
        <Stack direction="row" grow>
          <TextInput
            id="contactNameInput"
            placeholder="Contact name"
            defaultValue={selectedCustomer.contact_name}
            // Re-render this component whenever selectedCustomer.customer_id changes so that
            // the defaultValue re-computes.
            key={selectedCustomer.customer_id}
          />
          <Button
            task={{
              slug: "demo_update_customer_contact_name",
              params: {
                customer_id: selectedCustomer.customer_id,
                contact_name: contactName.value,
              },
              refetchTasks: {
                slug: "demo_search_customers",
                params: { search_keyword: searchKeyword.value },
              },
            }}
          >
            Update
          </Button>
        </Stack>
        <Divider />
        <Title order={5}>Danger Zone</Title>
        <Button
          color="red"
          onClick={() => alert("Add functionality here if you'd like!")}
        >
          Deactivate Customer
        </Button>
      </Stack>
    </Card>
  );
};

const customersCols = [
  { accessor: "customer_id", label: "Customer ID" },
  { accessor: "company_name", label: "Company name" },
  { accessor: "contact_name", label: "Contact name" },
  { accessor: "contact_title", label: "Contact title" },
  { accessor: "country", label: "County" },
  { accessor: "phone", label: "Phone" },
  { accessor: "fax", label: "Fax" },
];

const ordersCols = [
  { accessor: "order_id", label: "Order ID" },
  { accessor: "order_date", label: "Order date" },
  { accessor: "shipped_date", label: "Shipped date" },
  { accessor: "freight", label: "Freight" },
  {
    accessor: "ship_address",
    label: "Ship address",
    canEdit: true,
  },
  { accessor: "ship_postal_code", label: "Postal code" },
];

export default Dashboard;
