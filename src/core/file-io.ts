import { iOConnection } from "@config";
import { Response } from 'express'
import { createReadStream } from "fs";
import path from "path";

const readTmpFile = (id: string) => {
  return createReadStream(path.resolve(__dirname, `../../tmp/uploads/${id}`));
};

export const uploadFile = async (
  bucket: string,
  objectKey: string,
  file: {
    mimetype: string,
    filename: string,
  },
) => {
  const checkBucket = await iOConnection.bucketExists(bucket);
  if (!checkBucket) {
    await iOConnection.makeBucket(bucket, 'us-east-1')
  }
  const stream = readTmpFile(file.filename);
  return await iOConnection.putObject(bucket, objectKey, stream, {
    'Content-Type': file.mimetype
  });
};


export const readFile = async (
  res: Response,
  bucket: string,
  objectKey: string,
) => {
  const checkBucket = await iOConnection.bucketExists(bucket);
  if (!checkBucket) {
    return res.toJson(null, { issues: ['Bucket doesn\'t exists!'] }, 404, 'Bucket not found!');
  }
  const stream = await iOConnection.getObject(bucket, objectKey);
  stream.pipe(res);
};
