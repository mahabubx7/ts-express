import { Router, Request, Response } from "express";
import { web } from "./web";
import { api } from "./api";

export const router = Router();

router.use('/api', api);
router.use(web);
router.use('*', (_: Request, res: Response) => {
  res.status(404).send(`
    <html>
      <head>
        <title>Error 404</title>
        <link rel="stylesheet" href="/_static/app.css" />
      </head>
      <body>
        <h2>Route couldn't be found!</h2>
      </body>
    </html>
  `);
});
