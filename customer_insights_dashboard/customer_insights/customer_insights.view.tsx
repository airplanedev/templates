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
      <Stack direction="row" spacing="xl">
        <Table
          title="Unique customers per week"
          task="demo_get_customers_per_week"
          columns={countPerWeekCols}
          width={{ xs: "100%", lg: "auto" }}
        />
        <Table
          title="Unique products per week"
          task="demo_get_products_per_week"
          columns={countPerWeekCols}
          width={{ xs: "100%", lg: "auto" }}
        />
      </Stack>
      <Stack direction="row" spacing="xl">
        <Table
          title="Top products"
          task="demo_list_top_products"
          columns={topProductsCols}
          width={{ xs: "100%", lg: "auto" }}
        />
        <Table
          title="Orders per week"
          task="demo_get_orders_per_week"
          columns={countPerWeekCols}
          width={{ xs: "100%", lg: "auto" }}
        />
      </Stack>

      <Title>Customer details</Title>
      <Stack direction="row">
        <Select
          id="select"
          task="demo_list_customers"
          placeholder="Select customer"
          outputTransform={(customers) =>
            customers["Q1"].map((c) => ({
              label: c.contact_name,
              value: c.customer_id,
            }))
          }
          width={{ xs: "100%", sm: "30%" }}
        />
      </Stack>

      {!!selection && (
        <Stack direction="row" spacing="xl">
          <Table
            title="Top products"
            task={{
              slug: "demo_list_top_products",
              params: { customer_id: selection },
            }}
            columns={topProductsCols}
            width={{ xs: "100%", lg: "auto" }}
          />
          <Table
            title="Orders per week"
            task={{
              slug: "demo_get_orders_per_week",
              params: { customer_id: selection },
            }}
            columns={countPerWeekCols}
            width={{ xs: "100%", lg: "auto" }}
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
