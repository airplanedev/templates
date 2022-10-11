# Template: Create Cloudflare DNS records

## Next steps

- Navigate to the api_cloudflare directory: `cd api_cloudflare`
- Edit `api_cloudflare.task.yaml` and fill in your CLOUDFLARE_ZONE_ID (you can find the Zone ID from the dashboard: https://developers.cloudflare.com/fundamentals/get-started/basic-tasks/find-account-and-zone-ids/)
- Generate a Cloudflare API key (https://dash.cloudflare.com/profile/api-tokens) and save it in your local dev config: `airplane dev config set-configvar cloudflare_api_token=$YOUR_API_KEY`
- Develop your template locally: `airplane dev --studio`
- Deploy your task and schedule: `airplane deploy . --yes`
