from typing import Annotated
import airplane
import os
import json
import re
import databaseci
from databaseci.tempdb import temporary_local_db

# slug: schema
#   name: Desired SQL Schema
#   type: sql
#   description: The full desired SQL schema (e.g. `CREATE TABLE/INDEX` commands).
#   required: false


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
    db = databaseci.db(dsn)

    # TODO: boot postgres as a background process

    with temporary_local_db() as desired_db:
        desired_db.q(schema)
        commands = db.schemadiff_as_sql(desired_db)
        return commands

# #!/bin/bash

# # TODO: add Dockerfile that installs migra and jq
# # python: psycopg2
# env

# export DATABASE_RESOURCE_KIND=`echo $AIRPLANE_RESOURCES | jq .db.kind`
# # Confirm it is postgres, else error.

# export DATABASE_RESOURCE_DSN_RAW=`echo $AIRPLANE_RESOURCES | jq .db.dsn`
# # Maps `postgres://` -> `postgresql://` which is the format that SQLAlchemy expects.
# export DATABASE_RESOURCE_DSN=`echo $DATABASE_RESOURCE_DSN_RAW | sed -i 's/postgres:/postgresql:/'`

# echo "Diffing against desired schema:"
# echo $PARAM_SCHEMA

# migra $DATABASE_RESOURCE_DSN $DATABASE_RESOURCE_DSN $PARAM_SCHEMA


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
