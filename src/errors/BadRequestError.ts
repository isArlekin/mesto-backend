import { BAD_REQUEST } from '../constants/responseCodes';
import BackendError from './BackendError';

export default class BadRequestError extends BackendError {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = BAD_REQUEST;
    this.name = 'BadRequestError';

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#custom_error_types
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}
