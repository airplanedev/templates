import {
  Button,
  Stack,
  Table,
  Text,
  Title,
  TextInput,
  Card,
  useComponentState,
  Dialog,
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
      <Stack spacing="lg">
        <Table
          id="customers"
          title="Customers"
          columns={customersCols}
          task={{
            slug: "demo_search_customers",
            params: { search_keyword: searchKeyword.value },
          }}
          rowSelection="single"
          hiddenColumns={["address", "city", "postal_code"]}
          defaultPageSize={5}
        />
        {selectedCustomer && (
          <CustomerCard
            selectedCustomer={selectedCustomer}
            searchKeyword={searchKeyword}
          />
        )}
      </Stack>
    </Stack>
  );
};

const CustomerCard = ({ selectedCustomer, searchKeyword }) => {
  const contactName = useComponentState("contactNameInput");
  const { id, open, close } = useComponentState();

  return (
    <Card>
      <Stack direction="row" justify="space-between">
        <div>
          <Title order={3}>{selectedCustomer.company_name}</Title>
          <Text>
            {`${selectedCustomer.contact_name}, ${selectedCustomer.address} ${selectedCustomer.city}, 
          ${selectedCustomer.country}, ${selectedCustomer.postal_code}`}
          </Text>
        </div>
        <Stack direction="row" spacing="sm">
          <Button preset="tertiary" onClick={open} size="xs">
            Edit contact
          </Button>
          <Button
            color="red"
            onClick={() => alert("Add functionality here if you'd like!")}
            size="xs"
          >
            Deactivate customer
          </Button>
        </Stack>
      </Stack>
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
        defaultPageSize={5}
      />
      <Dialog id={id} title="Update contact name" onClose={close}>
        <Stack>
          <TextInput
            id="contactNameInput"
            placeholder="Contact name"
            defaultValue={selectedCustomer.contact_name}
            key={selectedCustomer.customer_id}
          />
          <Stack direction="row" justify="end">
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
                onSuccess: close,
              }}
            >
              Update
            </Button>
          </Stack>
        </Stack>
      </Dialog>
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
  { accessor: "order_date", label: "Order date", type: "datetime" },
  { accessor: "shipped_date", label: "Shipped date", type: "datetime" },
  { accessor: "freight", label: "Freight" },
  {
    accessor: "ship_address",
    label: "Ship address",
    canEdit: true,
  },
  { accessor: "ship_postal_code", label: "Postal code" },
];

export default Dashboard;
