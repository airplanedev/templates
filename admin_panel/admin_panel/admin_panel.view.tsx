import { Column, Button, Stack, Table, Text, Title, TextInput, Card, useComponentState, Divider } from "@airplane/views";

const Dashboard = () => {
  const searchKeyword = useComponentState("searchKeyword");
  const customersTable = useComponentState("customers");
  const contactName = useComponentState("contactNameInput");
  const selectedCustomer = customersTable.selectedRow;

  return (
    <Stack>
      <Title>Admin Panel</Title>
      <Text>Look up a customer, edit customer details, view orders for that customer, and edit order details.</Text>
      <TextInput id="searchKeyword" label="Search for a customer" />
      <Stack direction="row">
        <Table
          id="customers"
          title="Customers"
          task={{ slug: "demo_search_customers", params: { search_keyword: searchKeyword.value } }}
          rowSelection="single"
          showFilter={false}
          hiddenColumns={["address", "city", "region", "postal_code"]}
        />
        {selectedCustomer &&
          <Card>
            <Title order={3}>{ selectedCustomer.company_name }</Title>
            <Text>
              { selectedCustomer.address }
              <br/>
              { selectedCustomer.city }, { selectedCustomer.country }, { selectedCustomer.postal_code }
            </Text>
            <Stack>
              <Divider></Divider>
              <Title order={5}>Update point of contact</Title>
              <Stack direction="row">
                <TextInput id="contactNameInput" placeholder="Contact name" />
                <Button
                  task={{
                    slug: "demo_update_customer_contact_name",
                    params: { customer_id: selectedCustomer.customer_id , contact_name: contactName.value }
                  }}>Update</Button>
              </Stack>
              <Divider></Divider>
              <Title order={5}>Danger Zone</Title>
              <Button color="red" onClick={() => alert("Add functionality here if you'd like!")}>Deactivate Customer</Button>
            </Stack>
          </Card>
        }
      </Stack>
      {selectedCustomer &&
        <Stack>
          <Table
            title="Orders"
            task={{
              slug: "demo_list_customer_orders",
              params: { customer_id: selectedCustomer.customer_id },
            }}
            columns={[
              { accessor: "order_id", label: "Order ID" },
              { accessor: "order_date", label: "Order Date" },
              { accessor: "shipped_date", label: "Shipped Date" },
              { accessor: "freight", label: "Freight" },
              { accessor: "ship_address", label: "Ship Address", canEdit: true },
              { accessor: "ship_postal_code", label: "Postal Code" },
            ]}
            hiddenColumns={[
              "customer_id",
              "employee_id",
              "required_date",
              "ship_via",
              "ship_name",
              "ship_city",
              "ship_region",
              "ship_country"
            ]}
            rowActions={[{
              slug: "demo_update_ship_address",
              label: "Update Address"
            }]}
          />
        </Stack>
      }
    </Stack>
  );
};

export default Dashboard;
