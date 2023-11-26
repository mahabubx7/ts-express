import path from 'path';
import express, { Application, json, urlencoded } from 'express'
import 'express-async-errors';
import compression from 'compression'
import cors from 'cors'
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { router } from '@router';
import { registerCronJobs } from './app/jobs';
import { IsTestMode, PORT, connectMongoDB } from '@config';
import { applyModifications, globalErrorHandlerPipe, logger, setupPassportPlugins } from '@core';
import { redis } from './core/redis';


const app: Application = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());

app.use('/api', cors({ credentials: true })); // For APIs only
applyModifications(app);
app.use(helmet({
  hidePoweredBy: true,
}));

app.use(passport.initialize());
setupPassportPlugins(passport); // passport.js auth middlewares

app.use('/_static', express.static(path.resolve(__dirname, './public')));

// Establish database connection
(async () => {
  try {
    redis.once('connect', () => console.info(`🍎 Redis connection is established!`));
    await connectMongoDB();
  } catch (err) {
    console.error(err)
    logger.error('Database related error: ', err)
  }
})();

// app.use(asyncRouteHandler(router)); // should be at last
app.use(router); // should be at last
app.use(globalErrorHandlerPipe); // should be at last of all

async function boot() {

  if (!IsTestMode) {
    // handling server crash logs
    process.on('uncaughtException', (err) => {
      logger.error('Uncaught Exception', err);
    });

    process.on('unhandledRejection', (err, _) => {
      logger.error('Unhandled Promise Rejection', err);
    });
  }

  app.listen(PORT, () => {
    console.log(`🖥 Server ready at http://localhost:${PORT}`)
  });

  // listen to cron jobs
  registerCronJobs();
}


export {
  app,
  boot,
};
