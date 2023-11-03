import { connect } from "mongoose";
import { DatabaseUri } from "./variables";

export const connectMongoDB = async () => {
  await connect(DatabaseUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('🥭 MongoDB is connected!');
  })
  .catch((err) => {
    console.error(err)
  })
};
