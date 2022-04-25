/**
 * App error
 */
export default class AppError {
  public message: string;

  public code: number | undefined;

  public name: string = 'Error';

  /**
   * App Error Class
   * @param {string} message Error message
   * @param {number} code Error code
   */
  constructor(message: string, code?: number) {
    this.message = message;
    this.code = code;
  }

  /**
   * Transform this error to string
   * @return {string} Error as string
   */
  toString() {
    return `${this.code || 'unknown'}: ${this.message}`;
  }
}
