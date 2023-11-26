import mongo, { MongooseOptions } from "mongoose";
import { DatabaseUri } from "./variables";
import { logger } from "@core";

const mongoDbOptions: MongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
};

export const connectMongoDB = async () => {
  await mongo.connect(DatabaseUri, mongoDbOptions).then(() => {
    console.log('🥭 MongoDB connection is established!');
  })
  .catch((err) => {
    logger.error('MongoDB connection error: ', err);
    console.error(err)
  })
};


export const mongoDbPortable = () => {
  return {
    mongo,
    options: mongoDbOptions,
    databaseUri: DatabaseUri,
    testDatabaseUri: undefined, // update while setup tests
  };
};
