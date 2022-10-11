import airplane from "airplane"

export default airplane.workflow(
	{
		slug: "demo_update_sql_schema",
		name: "Update SQL schema",
		nodeVersion: "18",
		description: `Updates a SQL database to the desired SQL schema by diffing its existing schema with the desired schema and producing a set of SQL commands to run.`,
		resources: ["demo_db"],
		parameters: {
			"schema": {
				type: "sql",
				required: true,
				name: "Desired SQL schema",
				description: `The full SQL schema that the database should be updated to.`,
			}
		}
	},
	async (params) => {
		const diffRun = await airplane.execute<string>("demo_diff_schema", {
			schema: params.schema,
		})
		
		console.log(diffRun.output)

		const data = [
			{ id: 1, name: "Gabriel Davis", role: "Dentist" },
			{ id: 2, name: "Carolyn Garcia", role: "Sales" },
			{ id: 3, name: "Frances Hernandez", role: "Astronaut" },
			{ id: 4, name: "Melissa Rodriguez", role: "Engineer" },
			{ id: 5, name: "Jacob Hall", role: "Engineer" },
			{ id: 6, name: "Andrea Lopez", role: "Astronaut" },
		];

		data.sort((u1, u2) => {
			return u1.name.localeCompare(u2.name);
		});

		const results = await airplane.sql.query("demo_db", `SELECT 1;`)

		return { data, results };
	}
)
