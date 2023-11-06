import 'dotenv/config';

export const PORT: number = Number(process.env.PORT) || 5000;

export const JWT_SECRET: string = String(process.env.JWT_SECRET) || 'secret';

export const HASH_SECRET: string = String(process.env.HASH_SECRET) || 'top_secret'

export const GET_NODE_ENV = () => {
  return String(process.env.NODE_ENV) || 'dev'; // default: devMode
}

export const IsDevMode: boolean =
  GET_NODE_ENV().toLowerCase() === 'development' ||
  GET_NODE_ENV().toLowerCase() === 'dev' ? true : false;

export const IsProdMode: boolean =
  GET_NODE_ENV().toLowerCase() === 'production' ||
  GET_NODE_ENV().toLowerCase() === 'prod' ? true : false;

export const IsTestMode: boolean =
  GET_NODE_ENV().toLowerCase() === 'test' ? true : false;


// Database
export const DatabaseUri: string = String(process.env.DATABASE_URL)

// NodeMailer
export const MAILER_HOST: string = String(process.env.MAILER_HOST)
export const MAILER_USER: string = String(process.env.MAILER_USER)
export const MAILER_PASS: string = String(process.env.MAILER_PASS)

// Redis
export const REDIS_HOST: string = String(process.env.REDIS_HOST)
export const REDIS_PORT: number = Number(process.env.REDIS_PORT)
