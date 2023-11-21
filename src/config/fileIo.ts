import { Client } from 'minio'
import { iOAccessKey, iOSecretKey, iOServerHost, iOServerPort } from './variables';
import multer from 'multer';
import path from 'path';
import { Token } from '@core';

export const iOConnection = new Client({
  endPoint: iOServerHost,
  port: iOServerPort,
  useSSL: false,
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
});

