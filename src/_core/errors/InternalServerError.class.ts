import AppError from './AppError.class';

/**
 * Internal Server Error (500)
 */
export default class InternalServerError extends AppError {
  /**
   * Constructor
   * @param {string} message Error message
   */
  constructor(message?: string) {
    super(message || 'Internal Server Error', 500);
    this.name = 'Internal Server Error';
  }
}
