import AppError from './AppError.class';

/**
 * Forbidden Error (403)
 */
export default class ForbiddenError extends AppError {
  /**
   * Constructor
   * @param {string} message Error message
   */
  constructor(message?: string) {
    super(message || 'Forbidden', 403);
    this.name = 'Forbidden';
  }
}
