import { MailOptions } from "nodemailer/lib/smtp-pool";
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
