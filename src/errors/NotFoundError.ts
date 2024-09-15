import { NOT_FOUND } from '../constants/responseCodes';
import BackendError from './BackendError';

export default class NotFoundError extends BackendError {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = NOT_FOUND;
    this.name = 'NotFoundError';

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#custom_error_types
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
