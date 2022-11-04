# Template: Feature Flagging Dashboard

## Next steps

- Navigate to the feature_flagging_dashboard directory: `cd feature_flagging_dashboard`
- If you plan on using this on a different database resource than the demo database, change the `[Demo DB]` resource in `enable_feature_for_customer.task.yaml`, `create_feature.task.yaml`, `list_customers.task.yaml`, `disable_feature_for_customer.task.yaml`, `delete_feature.task.yaml`, `edit_feature.task.yaml`, `list_customers_for_feature.task.yaml` and `list_features.task.yaml` to the name of your own database resource
- Develop your template locally: `airplane dev`
- Deploy your tasks and view: `airplane deploy --yes`
- Visit the docs to learn more about how to build views: https://docs.airplane.dev/views/getting-started
