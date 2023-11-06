import path from 'path';
import express, { Application, json, urlencoded } from 'express'
import 'express-async-errors';
import compression from 'compression'
import cors from 'cors'
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { router } from '@router';
import { PORT, connectMongoDB } from '@config';
import { applyModifications, globalErrorHandlerPipe, setupPassportPlugins } from '@core';
import { redis } from '@config';


const app: Application = express();
app.use(json());
app.use(cookieParser());
app.use(compression());
app.use('/api', cors({ credentials: true })); // For APIs only
app.use(helmet({
  hidePoweredBy: true,
}));

applyModifications(app);
app.use(passport.initialize());
setupPassportPlugins(passport); // passport.js auth middlewares

app.use(urlencoded({ extended: true }));
app.use('/_static', express.static(path.resolve(__dirname, './public')));

// Establish database connection
(async () => {
  await connectMongoDB();
  await redis.connect();
})();

// app.use(asyncRouteHandler(router)); // should be at last
app.use(router); // should be at last
app.use(globalErrorHandlerPipe); // should be at last of all

async function boot() {
  app.listen(PORT, () => {
    console.log(`🖥 Server ready at http://localhost:${PORT}`)
  })
}


export {
  app,
  boot,
};
