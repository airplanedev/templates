import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { exec } from "child_process";
import fs from "fs";

type Params = {};

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_KEY || "",
    secretAccessKey: process.env.AWS_SECRET || "",
  },
});

const dbName = process.env.DB_NAME;
const dbPass = process.env.DB_PASS;
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPort = process.env.DB_PORT;

export default async function (params: Params) {
  try {
    const format = "backup";
    const date = new Date();
    const currentDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}-${date.getHours()}-${date.getMinutes()}`;
    const backupFilePath = `./${dbName}-${currentDate}.${format}`;

    exec(
      `PGPASSWORD=${dbPass} pg_dump -h ${dbHost} -U ${dbUser} -p ${dbPort} -Fc -d ${dbName} > ${backupFilePath}`,
      (error, stdout, stderr) => {
        if (error) {
          return console.error(`exec error: ${error}`);
        }
        if (stderr) {
          return console.error(`stderr: ${stderr}`);
        }

        const readStream = fs.createReadStream(backupFilePath);

        s3Client
          .send(
            new PutObjectCommand({
              Bucket: process.env.AWS_BUCKET,
              Key: backupFilePath.split("/")[1],
              Body: readStream,
            })
          )
          .then((data) => {
            console.log("SUCEESS", data);
          })
          .catch((error) => {
            console.log("ERROR DURRING DUMP", error);
          });
      }
    );
  } catch (error) {
    console.log("ERROR", error);
  }

  return { name: "Olushola", dob: "1995" };
}
