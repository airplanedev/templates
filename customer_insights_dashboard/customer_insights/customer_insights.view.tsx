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
          columns={countPerWeekCols}
        />
        <Table
          title="Unique products per week"
          task="demo_get_products_per_week"
          columns={countPerWeekCols}
        />
      </Stack>
      <Stack direction="row" spacing="xl" grow>
        <Table
          title="Top products"
          task="demo_list_top_products"
          columns={topProductsCols}
        />
        <Table
          title="Orders per week"
          task="demo_get_orders_per_week"
          columns={countPerWeekCols}
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
            columns={topProductsCols}
          />
          <Table
            title="Orders per week"
            task={{
              slug: "demo_get_orders_per_week",
              params: { customer_id: selection },
            }}
            columns={countPerWeekCols}
          />
        </Stack>
      )}
    </Stack>
  );
};

const countPerWeekCols = [
  { accessor: "cnt", label: "Count" },
  { accessor: "week", type: "date", label: "Week" },
];

const topProductsCols = [
  { accessor: "product_id", label: "Product ID" },
  { accessor: "product_name", label: "Product name" },
  { accessor: "cnt", label: "Number of orders" },
];

export default TeamDashboard;
