export class AppError extends Error {
  statusCode: number;
  code: string;

  constructor(message: string, statusCode: number, code: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.name = 'AppError';
  }
}

export function handleServerActionError(error: unknown): { message: string; code: string } {
  console.error('Server action error:', error);

  if (error instanceof AppError) {
    return {
      message: error.message,
      code: error.code,
    };
  }

  return {
    message: 'An unexpected error occurred',
    code: 'UNKNOWN_ERROR',
  };
}