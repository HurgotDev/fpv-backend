import AppError from './AppError.class';

/**
 * Not Implement method error (500)
 */
export default class NotImplementError extends AppError {
  /**
   * Constructor
   * @param {string} message Error message
   */
  constructor(message?: string) {
    super(message || 'Method No Implement', 500);
    this.name = 'NotImplementError';
  }
}
