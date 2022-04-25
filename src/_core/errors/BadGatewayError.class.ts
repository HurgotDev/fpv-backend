import AppError from './AppError.class';

/**
 * BadGateway Error (502)
 */
export default class BadGatewayError extends AppError {
  /**
   * Bad Gateway
   * @param {string} message Error message
   */
  constructor(message?: string) {
    super(message || 'Bad Gateway', 502);
    this.name = 'Bad Gateway';
  }
}
