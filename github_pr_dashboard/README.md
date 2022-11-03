# Template: GitHub PR dashboard

## Next steps

- Navigate to the github_pr_dashboard directory: `cd github_pr_dashboard`
- Develop your template locally: `airplane dev`
- To use your own GitHub API Key, get your GitHub API keys by following this guide: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token. Using your own GitHub API key will allow you to query private repositories and increase your rate limiting.
  - Create a config variable in Airplane for `GITHUB_API_KEY`: https://docs.airplane.dev/platform/configs
  - Also add the config variable to your dev config file in order to develop tasks locally: https://docs.airplane.dev/dev-lifecycle/dev-config-file#add-a-config-variable
  - Uncomment out `GITHUB_API_KEY` environment variable in `tasks/list_github_pull_requests.task.yaml`.
- Deploy your tasks and view: `airplane deploy --yes`
- Visit the docs to learn more about how to build views: https://docs.airplane.dev/views/getting-started
