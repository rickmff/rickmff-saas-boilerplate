/**
 * Standard application error class
 * Used to provide consistent error structure across the application
 */
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

/**
 * Common error types to ensure consistency
 */
export const ErrorCodes = {
  // Authentication errors
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',

  // Resource errors
  NOT_FOUND: 'NOT_FOUND',
  ALREADY_EXISTS: 'ALREADY_EXISTS',

  // Validation errors
  VALIDATION_ERROR: 'VALIDATION_ERROR',

  // External service errors
  STRIPE_ERROR: 'STRIPE_ERROR',

  // General errors
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
} as const;

export type ErrorCode = typeof ErrorCodes[keyof typeof ErrorCodes];

/**
 * Handle errors in server actions
 * @param error The error to handle
 * @returns Standardized error object for client
 */
export function handleServerActionError(error: unknown): { message: string; code: ErrorCode } {
  console.error('Server action error:', error);

  if (error instanceof AppError) {
    return {
      message: error.message,
      code: error.code as ErrorCode,
    };
  }

  // Handle specific error types
  if (error instanceof Error) {
    // Check for specific error patterns
    if (error.message.includes('stripe')) {
      return {
        message: 'Payment service error: ' + error.message,
        code: ErrorCodes.STRIPE_ERROR,
      };
    }

    // Return the error message if available
    return {
      message: error.message || 'An unexpected error occurred',
      code: ErrorCodes.INTERNAL_ERROR,
    };
  }

  // Default error
  return {
    message: 'An unexpected error occurred',
    code: ErrorCodes.UNKNOWN_ERROR,
  };
}

/**
 * Creates a new AppError instance
 * @param code Error code from ErrorCodes
 * @param message Custom error message (optional)
 * @returns AppError instance
 */
export function createError(code: ErrorCode, message?: string): AppError {
  switch (code) {
    case ErrorCodes.UNAUTHORIZED:
      return new AppError(message || 'You are not authorized to perform this action', 401, code);
    case ErrorCodes.FORBIDDEN:
      return new AppError(message || 'You do not have permission to access this resource', 403, code);
    case ErrorCodes.NOT_FOUND:
      return new AppError(message || 'Resource not found', 404, code);
    case ErrorCodes.VALIDATION_ERROR:
      return new AppError(message || 'Validation error', 400, code);
    case ErrorCodes.STRIPE_ERROR:
      return new AppError(message || 'Payment service error', 500, code);
    case ErrorCodes.ALREADY_EXISTS:
      return new AppError(message || 'Resource already exists', 409, code);
    case ErrorCodes.INTERNAL_ERROR:
      return new AppError(message || 'Internal server error', 500, code);
    default:
      return new AppError(message || 'An unexpected error occurred', 500, ErrorCodes.UNKNOWN_ERROR);
  }
}