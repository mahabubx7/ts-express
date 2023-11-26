import { User, UserModel } from "@modules";
import { mongoDbPortable } from "@config";
import { logger } from "@core";

export const cleanupInactiveNewRegistered = async () => {
  const { mongo, databaseUri, options } = mongoDbPortable();
  await mongo.connect(databaseUri, options)
  .catch((err) => console.error(err))

  try {
    const inactiveNewUsers = await UserModel.find({
      isDeleted: false,
      isActive: false,
      isEmailVerified: false,
    });

    await Promise.all(inactiveNewUsers.map((user: User) => user.remove()));
    console.log('executed cron successfully!...');
  } catch (err) {
    console.error('Error cleaning up inactive users: ', err);
    logger.error('Error cleaning up inactive users: ', err);
  } finally {
    mongo.disconnect();
  }
};
