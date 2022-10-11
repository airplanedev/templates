#!/bin/bash

# TODO: add Dockerfile that installs migra and jq
env

export DATABASE_RESOURCE_KIND=`echo $AIRPLANE_RESOURCES | jq .db.kind`
# Confirm it is postgres, else error.

export DATABASE_RESOURCE_DSN=`echo $AIRPLANE_RESOURCES | jq .db.dsn`

echo "Diffing against desired schema:"
echo $PARAM_SCHEMA

migra $DATABASE_RESOURCE_DSN $PARAM_SCHEMA
