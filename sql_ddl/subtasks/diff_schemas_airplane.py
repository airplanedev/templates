from typing import Annotated
import airplane
import os
import json
import re
import databaseci


@airplane.task(
    slug="demo_diff_schema",
    name="Diff database schemas",
    description="Produces a diff in the form of `ALTER TABLE` commands between a SQL database's existing schema and a desired schema.",
    resources=[airplane.Resource(slug="demo_db", alias="db")],
)
def diff_schemas(schema: Annotated[airplane.SQL, airplane.ParamConfig(
    description="The full desired SQL schema (e.g. `CREATE TABLE/INDEX` commands)."
)] = ""):
    dsn = get_dsn()
    # db = databaseci.db(dsn)
    db = databaseci.db("postgres://admin@localhost:5432/test")

    db_name = databaseci.tempdb.random_name(
        "airplane_schema_diff").replace("-", "_")

    try:
        print(f"Creating temporary DB ({db_name})...")
        temp_db = db.create_db(db_name)
        print(f"Created temporary DB ({db_name})")
        print("Applying desired schema to temporary DB...")
        temp_db.q(schema)
        print("Applied desired schema")
        return db.schemadiff_as_sql(temp_db).strip()
    finally:
        print(f"Dropping temporary DB ({db_name})...")
        # TODO: drop database; requires postgreSQL 13 to use force
        # db.drop_db(db_name, yes_really_drop=True)
        print(f"Dropped temporary DB ({db_name})")


def get_dsn():
    raw_resources = os.environ["AIRPLANE_RESOURCES"]
    if not raw_resources:
        raise Exception(f"No resources are connected")

    resources = json.loads(raw_resources)
    db_resource = resources["db"]
    if not db_resource:
        raise Exception(f"Expected a resource to be attached called 'db'")

    if not db_resource["kind"] == "postgres":
        raise Exception(f"Expected resource to be PostgreSQL")

    dsn = db_resource["dsn"]

    # SQLAlchemy expects `postgresql://` instead of `postgres://`.
    dsn = re.sub(r"^postgres://", "postgresql://", dsn)

    return dsn
