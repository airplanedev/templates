# Template: Support ticket dashboard

## Next steps

- Navigate to the support_ticket_dashboard directory: `cd support_ticket_dashboard`
- Develop your template locally: `airplane dev`
- Deploy your tasks and view: `airplane deploy --yes`
- To use your own Intercom auth token and Linear API key:
  - Intercom:
    - Get your Intercom auth token by following this guide: https://developers.intercom.com/building-apps/docs/authentication-types
    - Create a local config variable in Airplane for `INTERCOM_AUTH_TOKEN`: https://docs.airplane.dev/dev-lifecycle/dev-config-file#add-a-config-variable
    - Uncomment `INTERCOM_AUTH_TOKEN` environment variable in `list_open_intercom_conversations.task.yaml`
    - Remove mock data in `list_open_intercom_conversations.ts`
    - Add your Intercom app ID to `ticketing_dashboard.view.tsx`
  - Linear:
    - Get your Linear API key here after logging in: https://linear.app/airplane/settings/api
    - Create a local config variable in Airplane for `LINEAR_API_KEY`: https://docs.airplane.dev/dev-lifecycle/dev-config-file#add-a-config-variable
    - Uncomment `LINEAR_API_KEY` environment variable in `list_linear_users.task.yaml`, `list_linear_teams.task.yaml`, and `create_linear_issue.task.yaml`
    - Remove mock data in `list_linear_users.ts`, `list_linear_teams.ts`, and `create_linear_issue.ts`

## Resources

- Visit the Airplane docs to learn more about how to build views: https://docs.airplane.dev/views/getting-started
- Intercom API reference: https://developers.intercom.com/intercom-api-reference/reference/introduction
- Linear Typescript SDK: https://developers.linear.app/docs/sdk/getting-started
