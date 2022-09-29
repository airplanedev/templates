# Template: GitHub PR dashboard

## Next steps

- Navigate to the github_pr_dashboard directory: `cd github_pr_dashboard`
- Deploy tasks: `airplane deploy tasks --yes`
- Develop your template locally: `airplane views dev`
- To use your own GitHub API Key, get your GitHub API keys by following this guide: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token. Using yoiur own GitHub API key will allow you to query private repositories and increase your rate limiting.
  - Create a config variable in Airplane for `GITHUB_API_KEY`: https://docs.airplane.dev/platform/configs
  - Uncomment out `GITHUB_API_KEY` environment variable in `tasks/list_github_pull_requests.task.yaml`.
  - Re-deploy your tasks: `airplane deploy tasks --yes`
- Deploy your view: `airplane deploy .`
- Visit the docs to learn more about how to build views: https://docs.airplane.dev/views/getting-started
