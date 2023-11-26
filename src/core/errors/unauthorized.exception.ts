export class UnauthorizedException extends Error {
  code: number;
  error: any;

  constructor(
    message: string,
    error?: any,
  ) {
    super(message ?? 'Unauthorized!');
    this.code = 401;
    this.name = 'UNAUTHORIZED';
    this.error = error ?? null;
  }
}
