import path from 'path';
import express, { Application, json, urlencoded } from 'express'
// import './core/express.js'; // d.ts
import cookieParser from 'cookie-parser';
import passport from 'passport';
import 'express-async-errors';
import { router } from '@router';
import { PORT, connectMongoDB } from '@config';
import { applyModifications, globalErrorHandlerPipe, setupPassportPlugins } from '@core';


const app: Application = express();
applyModifications(app);
app.use(json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use('/_static', express.static(path.resolve(__dirname, './public')));
app.use(passport.initialize());
setupPassportPlugins(); // passport.js middlewares

// Establish database connection
(async () => {
  await connectMongoDB();
})();

// app.use(asyncRouteHandler(router)); // should be at last
app.use(router); // should be at last
app.use(globalErrorHandlerPipe); // should be at last of all

async function boot() {
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}`)
  })
}


export {
  app,
  boot,
};
