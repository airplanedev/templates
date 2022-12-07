#!/bin/bash

date_time=$(date "+%F-%H-%M-%S")
filename="$DB_NAME""_""$date_time"

location="./$filename"

mongodump --host=\"$DB_HOST\" --port=$DB_PORT --out=$location --db=$DB_NAME

# zip the generated dump
zip "$filename".zip "$location/$DB_NAME"

# delete the initial dump dir
rm -rf $location


# upload the zipped file to aws s3 bucket
RESPONSE=$(aws s3api put-object \
            --bucket $AWS_BUCKET \
            --body "./$filename.zip" \
            --key $filename)

if [ ! "$RESPONSE" ]
  then
    echo "ERROR: AWS reports put-object operation failed."
  else
    echo "Database dump completed successfully"
fi

# delete the zipped file after successful upload
rm -rf "./$filename".zip


