import {
  Stack,
  Table,
  Text,
  Title,
  TextInput,
  useComponentState,
} from "@airplane/views";

const Dashboard = () => {
  const searchKeyword = useComponentState("searchKeyword");
  const stripeCustomers = useComponentState("stripeCustomers");
  const selectedCustomer = stripeCustomers.selectedRow;

  return (
    <Stack>
      <Title>Stripe billing dashboard</Title>
      <Text>
        Lookup customers by their name or email, view all charges for that
        customer, and refund a charge if needed.
      </Text>
      <TextInput id="searchKeyword" label="Search for a customer" />
      {searchKeyword.value && (
        <Table
          id="stripeCustomers"
          title="Search results"
          task={{
            slug: "demo_list_stripe_customers",
            params: { search_keyword: searchKeyword.value },
          }}
          rowSelection="single"
          showFilter={false}
          hiddenColumns={["id"]}
          columns={[
            {
              label: "Email",
              accessor: "email",
            },
            {
              label: "Name",
              accessor: "name",
            },
          ]}
        />
      )}
      {selectedCustomer && (
        <Stack>
          <Table
            id="customerDetails"
            title="Customer details"
            task={{
              slug: "demo_lookup_stripe_customer",
              params: { customer_id: selectedCustomer.id },
            }}
            showFilter={false}
            columns={[
              {
                label: "Customer ID",
                accessor: "id",
              },
              {
                label: "Email",
                accessor: "email",
              },
              {
                label: "Currency",
                accessor: "currency",
              },
              {
                label: "Next invoice sequence",
                accessor: "next_invoice_sequence",
                type: "number",
              },
              {
                label: "Name",
                accessor: "name",
              },
            ]}
          />
          <Table
            id="customerCharges"
            title="Charges for this customer"
            task={{
              slug: "demo_lookup_charges_for_stripe_customer",
              params: { customer_id: selectedCustomer.id },
            }}
            hiddenColumns={["currency", "description"]}
            columns={[
              {
                label: "Charge date",
                accessor: "created_at",
                type: "date",
              },
              {
                label: "Charge ID",
                accessor: "id",
              },
              {
                label: "Amount",
                accessor: "amount",
                type: "number",
              },
              {
                label: "Amount refunded",
                accessor: "amount_refunded",
                type: "number",
              },
              {
                label: "Paid",
                accessor: "paid",
                type: "boolean",
              },
              {
                label: "Status",
                accessor: "status",
              },
            ]}
            rowActions={[
              {
                slug: "demo_refund_stripe_charge",
                label: "Refund",
                rowTransform: (r) => ({ charge_id: r.id }),
              },
            ]}
          />
        </Stack>
      )}
    </Stack>
  );
};

export default Dashboard;
