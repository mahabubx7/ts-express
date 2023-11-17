import 'dotenv/config';

export const PORT = process.env.PORT || 5000;

export const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const HASH_SECRET = process.env.HASH_SECRET || 'top_secret'

export const APP_SECRET = process.env.APP_SECRET_KEY || 'app_secret'

export const GET_NODE_ENV = process.env.NODE_ENV ?? 'dev'; // default: devMode

export const IsDevMode: boolean =
  GET_NODE_ENV.toLowerCase() === 'development' ||
  GET_NODE_ENV.toLowerCase() === 'dev' ? true : false;

export const IsProdMode: boolean =
  GET_NODE_ENV.toLowerCase() === 'production' ||
  GET_NODE_ENV.toLowerCase() === 'prod' ? true : false;

export const IsTestMode: boolean =
  GET_NODE_ENV.toLowerCase() === 'test' ? true : false;

  export const IsStagingMode: boolean =
  GET_NODE_ENV.toLowerCase() === 'staging' ? true : false;


// Database
export const DatabaseUri = process.env.DATABASE_URL

// NodeMailer
export const MAILER_HOST = process.env.MAILER_HOST
export const MAILER_USER = process.env.MAILER_USER
export const MAILER_PASS = process.env.MAILER_PASS

// Redis
export const REDIS_HOST = process.env.REDIS_HOST
export const REDIS_PORT = process.env.REDIS_PORT
export const REDIS_URI = process.env.REDIS_URI
