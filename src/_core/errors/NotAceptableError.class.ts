import AppError from './AppError.class';

/**
 * Not Aceptable (406)
 */
export default class NotAceptableError extends AppError {
  /**
   * Constructor
   * @param {string} message Error message
   */
  constructor(message?: string) {
    super(message || 'Not Aceptable', 406);
    this.name = 'Not Aceptable';
  }
}
