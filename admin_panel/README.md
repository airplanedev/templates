# Template: Admin panel

## Next steps

- Navigate to the admin_panel directory: `cd admin_panel`
- If you plan on using this on a different database resource than the demo database, change the `[Demo DB]` resource in `list_customer_orders.task.yaml`, `search_customers.task.yaml`, `update_customer_contact_name.task.yaml`, and `update_ship_address.task.yaml` to the name of your own database resource
- Deploy tasks: `airplane deploy tasks --yes`
- Develop your template locally: `airplane views dev`
- Deploy your view: `airplane deploy .`
- Visit the docs to learn more about how to build views: https://docs.airplane.dev/views/getting-started
