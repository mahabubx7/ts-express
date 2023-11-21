import { Client } from 'minio'
import { iOAccessKey, iOSecretKey, iOServerHost, iOServerPort } from './variables';
import { Response } from 'express';
import multer from 'multer';
import path from 'path';
import { Token } from '@core';

const iOConnection = new Client({
  endPoint: iOServerHost,
  port: iOServerPort,
  accessKey: iOAccessKey,
  secretKey: iOSecretKey,
});

export const uploader = multer({
  storage: multer.diskStorage({
    destination: (_, __, cb) => {
      cb(null, path.resolve(__dirname, '../../tmp/uploads'));
    },
    filename: (_, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      cb(null, `${new Token().genToken('hex')}.${ext}`);
    },
  }), // tmp storage
  // dest: path.resolve(__dirname, '../../uploads')
});


export const uploadFile = async (
  file: any,
  bucket: string,
  objectKey: string,
) => {
  console.log('file upload process .....')
  const checkBucket = await iOConnection.bucketExists(bucket);
  if (!checkBucket) {
    await iOConnection.makeBucket(bucket, 'us-east-1')
  }
  return iOConnection.putObject(bucket, objectKey, file);
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
