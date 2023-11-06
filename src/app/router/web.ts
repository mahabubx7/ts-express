import { Router, Request, Response } from "express";

export const web = Router();

web.get('/', (req: Request, res: Response) => {
  res.status(200).send(`
    <html>
      <head>
        <title>Welcome!</title>
        <link rel="stylesheet" href="/_static/app.css" />
      </head>
      <body>
        <h2>Welcome to Express.js backend server.</h2>
        <pre>
          <code><b>Http Version:</b> ${req.httpVersion}</code>
        </pre>
      </body>
    </html>
  `);
});
