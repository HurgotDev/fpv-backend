import AppError from './AppError.class';

/**
 * Bad Request (400)
 */
export default class BadRequestError extends AppError {
  /**
   * Constructor
   * @param {string} message Error message
   */
  constructor(message?: string) {
    super(message || 'Bad Request', 400);
    this.name = 'Bad Request';
  }
}
