# Template: User impersonation tool

## Next steps

- Navigate to the user_impersonation_tool directory: `cd user_impersonation_tool`
- Deploy tasks: `airplane deploy tasks --yes`
- Develop your template locally: `airplane views dev`
- To use your own WorkOS API Key:
  - Get your Intercom auth token by following this guide: https://workos.com/docs/reference/api-keys
  - Create a config variable in Airplane for `WORKOS_API_KEY`: https://docs.airplane.dev/platform/configs
  - Uncomment `WORKOS_API_KEY` environment variable in `impersonate.task.yaml`
  - Remove mock data in `impersonate.ts`
  - Add config variables to your dev config file in order to develop tasks locally: https://docs.airplane.dev/dev-lifecycle/dev-config-file#environment-variables
  - Re-deploy tasks: `airplane deploy tasks --yes`
- Optionally, you can rewrite `generateSignInLink` to use your authentication provider of choice
- Deploy your view: `airplane deploy .`

## Resources

- Visit the Airplane docs to learn more about how to build views: https://docs.airplane.dev/views/getting-started
- WorkOS API reference: https://workos.com/docs/reference
