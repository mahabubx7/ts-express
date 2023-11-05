export class CustomException extends Error {
  code: number;
  error: any;

  constructor(
    message: string,
    code?: number,
    name?: string,
    error?: any,
  ) {
    super(message);
    this.code = code ?? 400;
    this.name = name ?? 'CustomError';
    this.error = error;
  }
}
