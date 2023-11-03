export class CustomException extends Error {
  code: number;

  constructor(
    message: string,
    code?: number,
    name?: string
  ) {
    super(message);
    this.code = code ?? 400;
    this.name = name ?? 'CustomError';
  }
}
