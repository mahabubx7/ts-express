// import { exec } from 'child_process';
import cron from 'node-cron';
import { cleanupInactiveNewRegistered } from './new-non-active-user.cron';

export function registerCronJobs() {
  // :: Register Cron Jobs/Tasks in here :: //

  // Remove non-active new registered users (<= 30m)
  cron.schedule('*/30 * * * *', async () => {
    console.log('executing cron ...');
    await cleanupInactiveNewRegistered();
  });

  // :: /Register Cron Jobs/Tasks in here/ :: //
}
