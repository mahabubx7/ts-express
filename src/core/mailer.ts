import { MailOptions } from "nodemailer/lib/smtp-pool";
import { Request } from "express";
import { mailDataOptions } from "./types";
import { MAILER_HOST, mailer } from "@config";
import { CustomException } from "./errors";

export const makeMail = async (
  options: mailDataOptions
): Promise<MailOptions> => {
  try {
    const {
      from,
      to,
      cc,
      bcc,
      subject,
      html,
      text,
      attachments
    } = options;
    return {
      from: from ?? `${MAILER_HOST}`,
      to,
      cc: cc ?? undefined,
      bcc: bcc ?? undefined,
      subject,
      html,
      text: text ?? '',
      attachments: attachments && attachments.length > 0 ? attachments : [],
    }
  } catch (errors) {
    throw new CustomException(
      'Mail data constructing got failed!',
      500,
      'MAIL_ERROR',
      errors
    );
  }
};

export const cookEmailHtml = (req: Request, data: {
  title?: string
  name?: string
  heading?: string
  subHeading?: string
  linkPostfix?: string
  linkExpire?: string
  linkPostPath?: string
  raw?: string
}) => {
  return `
    <html>
      <head>
        <title>${data.title ?? 'Registration Successful!'}</title>
      </head>
      <body>
        <h1>Dear, ${data.name ?? 'user!'}</h1>
        <h2>${data.heading ?? 'Registration Successful!'}</h2>
        <hr />
        <h3>${data.subHeading ?? 'Please verify your e-mail address to active your account'}</h3>

        ${data.raw ? `
          <div>${data.raw}</div>
        ` : ''}

        ${data.linkExpire ? (
          `
            <p style="color: red">
              <b>Note:</b> This will be expired after ${(Number(data.linkExpire)/1000)} seconds.
            </p>
          `
        ) : ''}

        ${data.linkPostfix ? `
        <a href="${req.protocol + '://' + req.get('host')}${data.linkPostfix ?? `${data.linkPostPath ?? `/verify/email?token`}=${Math.random()}`}">verify</a>
        ` : ''}
      </body>
    </html>
  `;
}

export const sendMail = async (data: MailOptions) => {
  let status: false | unknown = false;
  mailer.sendMail(data, (err, info) => {
    if (err) {
      throw new CustomException(
        'Mail sending failed!',
        500,
        'MAIL_ERROR',
        err
      );
    }
    status = info;
  });

  return status;
};
