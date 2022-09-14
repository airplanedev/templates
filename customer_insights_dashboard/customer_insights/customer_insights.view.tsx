import {
  Select,
  SelectState,
  Stack,
  Table,
  Title,
  useComponentState,
} from "@airplane/views";

// Views documentation: https://docs.airplane.dev/views/getting-started
const TeamDashboard = () => {
  const selectState = useComponentState<SelectState>("select");
  const selection = selectState.value;
  return (
    <Stack spacing="md">
      <Title>Global stats</Title>
      <Stack direction="row" spacing="xl" grow>
        <Table
          title="Unique customers per week"
          task="demo_get_customers_per_week"
          columns={[
            { accessor: "cnt", label: "Count" },
            { accessor: "week", type: "date", label: "Week" },
          ]}
        />
        <Table
          title="Unique products per week"
          task="demo_get_products_per_week"
          columns={[
            { accessor: "cnt", label: "Count" },
            { accessor: "week", type: "date", label: "Week" },
          ]}
        />
      </Stack>
      <Stack direction="row" spacing="xl" grow>
        <Table
          title="Top products"
          task="demo_list_top_products"
          columns={[
            { accessor: "product_id", label: "Product id" },
            { accessor: "product_name", label: "Product name" },
            { accessor: "cnt", label: "Number of orders" },
          ]}
        />
        <Table
          title="Orders per week"
          task="demo_get_orders_per_week"
          columns={[
            { accessor: "cnt", label: "Count" },
            { accessor: "week", type: "date", label: "Week" },
          ]}
        />
      </Stack>

      <Title>Customer details</Title>
      <Select
        id="select"
        sx={{ width: "300px" }}
        task="demo_list_customers"
        placeholder="Select customer"
        outputTransform={(customers) =>
          customers["Q1"].map((c) => ({
            label: c.contact_name,
            value: c.customer_id,
          }))
        }
      />
      {!!selection && (
        <Stack direction="row" spacing="xl" grow>
          <Table
            title="Top products"
            task={{
              slug: "demo_list_top_products",
              params: { customer_id: selection },
            }}
            columns={[
              { accessor: "product_id", label: "Product id" },
              { accessor: "product_name", label: "Product name" },
              { accessor: "cnt", label: "Number of orders" },
            ]}
          />
          <Table
            title="Orders per week"
            task={{
              slug: "demo_get_orders_per_week",
              params: { customer_id: selection },
            }}
            columns={[
              { accessor: "cnt", label: "Count" },
              { accessor: "week", type: "date", label: "Week" },
            ]}
          />
        </Stack>
      )}
    </Stack>
  );
};

export default TeamDashboard;
