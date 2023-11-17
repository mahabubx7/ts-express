import { connect } from "mongoose";
import { DatabaseUri } from "./variables";
import { logger } from "@core";

export const connectMongoDB = async () => {
  await connect(DatabaseUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  }).then(() => {
    console.log('🥭 MongoDB connection is established!');
  })
  .catch((err) => {
    logger.error('MongoDB connection error: ', err);
    console.error(err)
  })
};
