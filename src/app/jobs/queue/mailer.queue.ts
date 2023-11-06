import { Queue, QueueBaseOptions } from "bullmq";

const emailQueueOptions: QueueBaseOptions = {
  //
};

export const emailQueue = new Queue('email', emailQueueOptions);
