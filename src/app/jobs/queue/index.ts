import { emailVerifyQueue } from './mailer.q';

export const queues = [
  emailVerifyQueue,
]; // for bull-board only

/**
 * @Register modules for all queues
 * Exporting queues & its helper functions
 */
export * from './mailer.q';
