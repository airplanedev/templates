# Template: Stripe billing dashboard

## Next steps

- Navigate to the stripe_billing_dashboard directory: `cd stripe_billing_dashboard`
- Deploy tasks: `airplane deploy tasks --yes`
- Develop your template locally: `airplane dev --editor`
- To use your own Stripe API Key, get your Stripe API keys by following this guide: https://stripe.com/docs/keys#obtain-api-keys
  - Create a config variable in Airplane for `STRIPE_SECRET_KEY`: https://docs.airplane.dev/platform/configs
  - Uncomment out `STRIPE_SECRET_KEY` environment variable in `list_stripe_customers.task.yaml`, `lookup_charges_for_stripe_customer.task.yaml`, `lookup_stripe_customer.task.yaml`, and `lookup_stripe_customer.task.yaml`
  - Add config variable to dev config file in order to develop tasks locally: https://docs.airplane.dev/dev-lifecycle/dev-config-file#environment-variables
  - Re-deploy your tasks: `airplane deploy tasks --yes`
- Deploy your view: `airplane deploy .`
- Visit the docs to learn more about how to build views: https://docs.airplane.dev/views/getting-started
