import Bull from "bull";
import { redisOptions, sendMail } from "@core";
import SMTPPool from "nodemailer/lib/smtp-pool";

// interface for enqueue data
interface IEmailQueueData {
  mail: SMTPPool.MailOptions
}

// queue
export const emailVerifyQueue = new Bull<IEmailQueueData>('emailVerifyQueue', {
  redis: redisOptions
});

// job process
emailVerifyQueue.process(async function (job, done) {
  try {
    job.progress(10)
    await sendMail(job.data.mail);
    job.progress(80)
    setTimeout(() => null, 1000); // fake time taking 1s
    job.progress(100)
    done(null, { status: 'sent!' });
  } catch (err) {
    console.error(err);
  }
});

// enqueue
export const sentEmailVerification = (_: IEmailQueueData) => emailVerifyQueue.add(_)
