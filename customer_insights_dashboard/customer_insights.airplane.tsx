import {
  Chart,
  Select,
  SelectState,
  Stack,
  Title,
  useComponentState,
} from "@airplane/views";
import airplane from "airplane";

// Views documentation: https://docs.airplane.dev/views/getting-started
const TeamDashboard = () => {
  const selectState = useComponentState<SelectState>("select");
  const selection = selectState.value;
  return (
    <Stack spacing="md">
      <Title>Customer insights dashboard</Title>
      <Stack direction="row" spacing="xl">
        <Chart
          title="Unique customers per week"
          type="line"
          task="demo_get_customers_per_week"
          width={{ xs: "100%", lg: "50%" }}
          outputTransform={(o) => o.Q1}
          xAxisTitle="Week"
          yAxisTitle="Customers"
          legendPosition="hidden"
        />
        <Chart
          title="Unique products per week"
          type="line"
          task="demo_get_products_per_week"
          width={{ xs: "100%", lg: "50%" }}
          outputTransform={(o) => o.Q1}
          xAxisTitle="Week"
          yAxisTitle="Products"
          legendPosition="hidden"
        />
      </Stack>
      <Stack direction="row" spacing="xl">
        <Chart
          title="Top products"
          type="bar"
          task="demo_list_top_products"
          width={{ xs: "100%", lg: "50%" }}
          outputTransform={(o) => o.Q1}
          xAxis="product_name"
          datasets={["cnt"]}
          xAxisTitle="Product"
          yAxisTitle="Orders"
          legendPosition="hidden"
        />
        <Chart
          title="Orders per week"
          type="line"
          task="demo_get_orders_per_week"
          width={{ xs: "100%", lg: "50%" }}
          outputTransform={(o) => o.Q1}
          xAxisTitle="Week"
          yAxisTitle="Orders"
          legendPosition="hidden"
        />
      </Stack>

      <Title order={2}>Customer details</Title>
      <Stack direction="row">
        <Select
          id="select"
          task="demo_list_customers_customer_insights"
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
          <Chart
            title="Top products"
            type="bar"
            task={{
              slug: "demo_list_top_products",
              params: { customer_id: selection },
            }}
            width={{ xs: "100%", lg: "50%" }}
            outputTransform={(o) => o.Q1}
            xAxis="product_name"
            datasets={["cnt"]}
            xAxisTitle="Product"
            yAxisTitle="Orders"
            legendPosition="hidden"
          />
          <Chart
            title="Orders per week"
            type="scatter"
            task={{
              slug: "demo_get_orders_per_week",
              params: { customer_id: selection },
            }}
            width={{ xs: "100%", lg: "50%" }}
            outputTransform={(o) => o.Q1}
            xAxisTitle="Week"
            yAxisTitle="Orders"
            legendPosition="hidden"
          />
        </Stack>
      )}
    </Stack>
  );
};

export default airplane.view(
  {
    slug: "demo_customer_insights",
    name: "Customer insights",
  },
  TeamDashboard
);
