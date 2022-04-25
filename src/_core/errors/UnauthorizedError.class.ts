import AppError from './AppError.class';

/**
 * Unauthorized (401)
 */
export default class UnauthorizedError extends AppError {
  /**
   * Constructor
   * @param {string} message Error message
   */
  constructor(message?: string) {
    super(message || 'Unauthorized', 401);
    this.name = 'Unauthorized';
  }
}
