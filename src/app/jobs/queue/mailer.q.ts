import Bull from "bull";
import { redisOptions, sendMail } from "@core";
import SMTPPool from "nodemailer/lib/smtp-pool";

// interface for enqueue data
interface IEmailQueueData {
  mail: SMTPPool.MailOptions
}

// queues
export const emailVerifyQueue = new Bull<IEmailQueueData>('emailVerifyQueue', {
  redis: redisOptions
});

export const emailSenderQueue = new Bull<IEmailQueueData>('emailSenderQueue', {
  redis: redisOptions
});

// job processes
emailVerifyQueue.process(async function (job, done) {
  try {
    job.progress(10)
    await sendMail(job.data.mail);
    job.progress(80)
    setTimeout(() => null, 1000); // fake time taking 1s // testing purpose only
    job.progress(100)
    done(null, { status: 'sent!' });
  } catch (err) {
    console.error(err);
  }
});

emailSenderQueue.process(async function (job, done) {
  try {
    job.progress(10)
    await sendMail(job.data.mail);
    job.progress(90)
    console.info('Email: sent!');
    job.progress(100)
    done(null, { status: 'sent!' });
  } catch (err) {
    console.error(err);
  }
});

// enqueues
export const sentEmailVerification = (_: IEmailQueueData) => emailVerifyQueue.add(_)
export const addEmailToQueue = (_: IEmailQueueData) => emailSenderQueue.add(_)
