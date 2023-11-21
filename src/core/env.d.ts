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

    // S3_ENDPOINT?: string
    // S3_FORCE_PATH?: boolean
    IO_SSL_ENABLED?: boolean
    IO_ACCESS_KEY?: string
    IO_SECRET_KEY?: string
    IO_SERVER_HOST?: string
    IO_SERVER_PORT?: number
  }
}
