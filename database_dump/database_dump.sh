#!/bin/bash

DB_KIND=$(jq -r '.kind' <<<"$AIRPLANE_RESOURCES")

date_time=$(date "+%F-%H-%M-%S")
filename="$DB_KIND""_""$date_time"

location="./$filename".backup

if [ "$DB_KIND" == "postgres" ]; then

  HOSTNAME=$(jq -r '.host' <<<"$AIRPLANE_RESOURCES")
  USERNAME=$(jq -r '.username' <<<"$AIRPLANE_RESOURCES")
  DATABASE=$(jq -r '.database' <<<"$AIRPLANE_RESOURCES")
  PASSWORD=$(jq -r '.password' <<<"$AIRPLANE_RESOURCES")

  export PGPASSWORD="$PASSWORD"
  pg_dump -F t -h $HOSTNAME -U $USERNAME $DATABASE > $location
  unset PGPASSWORD

elif [ "$DB_KIND" == "mongodb" ]; then

  URI=$(jq -r '.connectionString' <<<"$AIRPLANE_RESOURCES")
  mongodump --uri=\"$URI\" --archive=$location
# mongodump --uri=\"$DB_HOST\" --host=\"$DB_HOST\" --port=$DB_PORT --out=$location --db=$DB_NAME

else
  echo "Invalid DB type: This script only supports postgres or mongoDB"
fi

# zip the generated dump
zip "$filename".zip "$location/$DB_NAME"

# delete the initial dump dir
rm -rf $location

zipped_filepath="./$filename.zip"

# upload the zipped file to aws s3 bucket
RESPONSE=$(aws s3api put-object \
  --bucket $AWS_BUCKET \
  --body $zipped_filepath \
  --key $filename)

if [ ! "$RESPONSE" ]; then
  echo "ERROR: AWS reports put-object operation failed."
else
  echo "Database dump completed successfully"
fi

# delete the zipped file after successful upload
rm -rf $zipped_filepath
