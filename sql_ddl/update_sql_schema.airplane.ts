import airplane from "airplane"

export default airplane.workflow(
	{
		slug: "demo_update_sql_schema",
		name: "Update SQL schema",
		description: `Updates a SQL database to the desired SQL schema by diffing its existing schema with the desired schema and producing a set of SQL commands to run.`,
		resources: {"db": "demo_db"},
		parameters: {
			"schema": {
				// TODO: use files instead of strings -- schema is very large
				type: "sql",
				required: true,
				name: "Desired SQL schema",
				description: `The full SQL schema that the database should be updated to.`,
			}
		}
	},
	async (params) => {
		const alterCommands = await diffSchema(params.schema)

		// There are no changes to be made.
		if (!alterCommands) {
			await airplane.display.text("No schema changes were found.")
			return
		}

		await airplane.prompt.confirm({
			confirmText: "Apply",
			description: "**Please review the following SQL commands.** If they are correct, click apply.\n\n```sql\n" + alterCommands + "\n```"
		})

		// TODO: apply!
	}
)

const diffSchema = async (schema: string): Promise<string> => {
	const run = await airplane.execute<string>("demo_diff_schema", { schema })
	return run.output
}