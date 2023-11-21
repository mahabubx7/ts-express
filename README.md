# Express.js with TypeScript

> It's production ready express.js backend project boilerplate

### Core concepts

- Type-safe with TypeScript 4.8+ or 5.x
- Mongoose for MongoDB
- REST-APIs `JSON` approach & GraphQL can added later easily (just add schema, resolvers, and server integration).
- Modular structure approach
- Development made-easy core modifications
- Built for ES2020 and requires Node.js v18 or later
- Authentication using `passport.js` as local, jwt and oauth strategies
- Authorization own/custom policy-based-access-control including RBAC
- Token based `JWT` authentication with httpOnly cookies
- Cron jobs with `node-cron` and Queues with `bull`
- Mailing feature with `nodemailer`
- Logger using `winstone` or `morgan` or something else
- API response caching with `redis`

#### Todo:

- [x] Make custom `access-control` with roles & its hierarchy based permissions.
- [x] Parse and assign DTO after result into `req.bodyParsed` or `req.zod.results`
- [x] Add Request rate-limiter or throttler
- [x] Logger setup for `dev` or `production` mode
- [x] Setup file uploads and retriever (i.e. `multer`, `aws-s3` or `minIo`)
- [] Implement API Documentation. [Recommended: `swagger/js-doc`]
- [] Implement Tests (Unit, Integrations and e2e [at least for Auth & Todo])
- [] Complete and Run production app with Docker (compose) + Caddy/Nginx.
- [] (optional) Implement real-time communication setup
