export class NotFoundException extends Error {
  code: number;
  error: any;

  constructor(
    message: string,
    error?: any,
  ) {
    super(message ?? 'Not found!');
    this.code = 404;
    this.name = 'NOT_FOUND';
    this.error = error ?? null;
  }
}
