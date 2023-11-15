import { Application } from 'express';
import { queues } from '@jobs';
import { ExpressAdapter } from '@bull-board/express';
import { createBullBoard } from '@bull-board/api'
import { BullAdapter } from '@bull-board/api/bullAdapter'
import { applyToJSON } from './response';
import { applyRequestState } from './state';

// Express App :: Custom modifications

export function applyModifications(app: Application) {
  app.use(applyToJSON);
  app.use(applyRequestState);
  app.disable('x-powered-by');

  // @bull-board integrations :: START //
  const queueAdapters = queues.map((q) => new BullAdapter(q))
  const expressAdapter = new ExpressAdapter();
  expressAdapter.setBasePath('/bull');
  createBullBoard({
    queues: queueAdapters,
    serverAdapter: expressAdapter,
  });
  app.use('/bull', expressAdapter.getRouter());
  // @bull-board integrations :: END //
}

/** -----------------------------------------------*
 * @REGISTERER core modules
 * @CORE ts-express project
 * @AUTHOR @mahabubx7 [Mahabub]
 *-------------------------------------------------*/

export * from './password';
export * from './passport';
export * from './policy';
export * from './token';
export * from './types';
export * from './errors';
export * from './mailer';
export * from './redis';
export * from './state';
