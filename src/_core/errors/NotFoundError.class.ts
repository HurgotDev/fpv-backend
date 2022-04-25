import AppError from './AppError.class';

/**
 * Not Found (404)
 */
export default class NotFoundError extends AppError {
  /**
   * Constructor
   * @param {string} message Error message
   */
  constructor(message?: string) {
    super(message || 'Not Found', 404);
    this.name = 'Not Found';
  }
}
