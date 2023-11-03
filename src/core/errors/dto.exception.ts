import { ZodIssue } from "zod";

export class DtoException extends Error {
  code: number;
  issues: ZodIssue[];

  constructor(
    message: string,
    issues: ZodIssue[],
    code?: number,
  ) {
    super(message);
    this.issues = issues;
    this.name = 'ZodError';
    this.code = code ?? 406;
  }
}
