export class ForbiddenException extends Error {
  code: number;
  error: any;

  constructor(
    message: string,
    error?: any,
  ) {
    super(message ?? 'Forbidden!');
    this.code = 403;
    this.name = 'FORBIDDEN';
    this.error = error ?? {};
  }
}
