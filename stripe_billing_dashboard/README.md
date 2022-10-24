# Template: Stripe billing dashboard

## Next steps

- Navigate to the stripe_billing_dashboard directory: `cd stripe_billing_dashboard`
- Develop your template locally: `airplane dev`
- To use your own Stripe API Key, get your Stripe API keys by following this guide: https://stripe.com/docs/keys#obtain-api-keys
  - Create a config variable in Airplane for `STRIPE_SECRET_KEY`: https://docs.airplane.dev/platform/configs
  - Also add the config variable to your dev config file in order to develop tasks locally: https://docs.airplane.dev/dev-lifecycle/dev-config-file#add-a-config-variable
  - Uncomment out `STRIPE_SECRET_KEY` environment variable in `list_stripe_customers.task.yaml`, `lookup_charges_for_stripe_customer.task.yaml`, `lookup_stripe_customer.task.yaml`, and `lookup_stripe_customer.task.yaml`
- Deploy your tasks and view: `airplane deploy --yes`
- Visit the docs to learn more about how to build views: https://docs.airplane.dev/views/getting-started
