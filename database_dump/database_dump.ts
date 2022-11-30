import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// import {path} from "path";
// import {fs} from "fs";

type Params = {
  database_url: string;
};

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_KEY || "",
    secretAccessKey: process.env.AWS_SECRET || "",
  },
});

export default async function (params: Params) {
  try {
    const data = await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET,
        Key: "",
        Body: "",
      })
    );
    console.log("SUCEESS", data);
  } catch (error) {
    console.log("ERROR", error);
  }

  return {};
}
