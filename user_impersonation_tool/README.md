# Template: User impersonation tool

## Next steps

- Navigate to the user_impersonation_tool directory: `cd user_impersonation_tool`
- Develop your template locally: `airplane dev`
- To use your own WorkOS API Key:
  - Get your Intercom auth token by following this guide: https://workos.com/docs/reference/api-keys
  - Create a config variable in Airplane for `WORKOS_API_KEY`: https://docs.airplane.dev/platform/configs
  - Also add the config variable to your dev config file in order to develop tasks locally: https://docs.airplane.dev/dev-lifecycle/dev-config-file#add-a-config-variable
  - Uncomment `WORKOS_API_KEY` environment variable in `impersonate.task.yaml`
  - Remove mock data in `impersonate.ts`
- Optionally, you can rewrite `generateSignInLink` to use your authentication provider of choice
- Deploy your tasks and view: `airplane deploy --yes`

## Resources

- Visit the Airplane docs to learn more about how to build views: https://docs.airplane.dev/views/getting-started
- WorkOS API reference: https://workos.com/docs/reference
