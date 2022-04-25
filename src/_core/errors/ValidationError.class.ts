import AppError from './AppError.class';

/**
 * Validation Error Class (400)
 */
export default class ValidationError extends AppError {
  /**
   * Constructor
   * @param {string} message Error message
   */
  constructor(message?: string) {
    super(message || 'Validation Error', 400);
    this.name = 'ValidationError';
  }
}
