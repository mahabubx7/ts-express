import { Application } from 'express';
import { applyToJSON } from './response';

export function applyModifications(app: Application) {
  app.use(applyToJSON);
}

export * from './password';
export * from './passport';
export * from './token';
export * from './types';
export * from './errors';
export * from './mailer';
