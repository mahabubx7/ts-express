import { createTransport } from "nodemailer";
import { IsProdMode, MAILER_PASS, MAILER_USER } from "./variables";

export const mailer = createTransport({
  service: 'gmail',
  port: 465,
  auth: {
    user: MAILER_USER,
    pass: MAILER_PASS,
  },
  secure: IsProdMode
});
