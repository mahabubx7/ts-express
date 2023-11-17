declare namespace NodeJS {

  // :: Types for environment variables ::

  interface ProcessEnv {
    DATABASE_URL: string
    PORT: number
    NODE_ENV: 'dev' | 'development' | 'production' | 'prod' | 'test' | 'staging' // # Fixed type names

    APP_SECRET_KEY: string
    JWT_SECRET: string
    HASH_SECRET: string
    REDIS_HOST: string
    REDIS_PORT: number

    MAILER_HOST?: string
    MAILER_USER: string
    MAILER_PASS: string
  }
}
