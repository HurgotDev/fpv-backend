import AppError from './AppError.class';

/**
 *  Method Not Allowed (405)
 */
export default class NotAllowedError extends AppError {
  /**
   * Constructor
   * @param {string} message Error message
   */
  constructor(message?: string) {
    super(message || 'Method Not Allowed', 405);
    this.name = 'Method Not Allowed';
  }
}
