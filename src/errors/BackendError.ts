export default abstract class BackendError extends Error {
  abstract readonly statusCode: number;

  protected constructor(message: string) {
    super(message);
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#custom_error_types
    Object.setPrototypeOf(this, BackendError.prototype);
  }

  format() {
    return {
      message: this.message,
    };
  }
}
