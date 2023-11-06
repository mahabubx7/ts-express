import { connect } from "mongoose";
import { DatabaseUri } from "./variables";

export const connectMongoDB = async () => {
  await connect(DatabaseUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  }).then(() => {
    console.log('🥭 MongoDB connection is established!');
  })
  .catch((err) => {
    console.error(err)
  })
};
