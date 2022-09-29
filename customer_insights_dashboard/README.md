# Template: Customer insights dashboard

## Next steps

- Navigate to the customer_insights_dashboard directory: `cd customer_insights_dashboard`
- If you plan on using this on a different database resource than the demo database, change the `[Demo DB]`  resource in `list_top_products.task.yaml`, `list_customers.task.yaml`, `get_orders_per_week.task.yaml`, `get_products_per_week.task.yaml`, and `get_customers_per_week.task.yaml` to your own database resource
- Deploy tasks: `airplane deploy tasks --yes`
- Develop your template locally: `airplane views dev`
- Deploy your view: `airplane deploy .`
- Visit the docs to learn more about how to build views: https://docs.airplane.dev/views/getting-started
