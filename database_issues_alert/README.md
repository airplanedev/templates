# Template: Alert on database issues

## Next steps

- Navigate to the database_issues_alert directory: `cd database_issues_alert`
- Edit the slack channel you want to send the alert to in alert_on_database_issues.task.yaml (where it says `INSERT_SLACK_CHANNEL_HERE`)
- If you plan on using this on a different database resource than the demo database, change the `demo_db` resource in alert_on_database_issues.task.yaml to your own database resource's slug.
- Deploy your task and schedule: `airplane deploy . --yes`
