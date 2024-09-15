import { SERVER_ERROR } from '../constants/responseCodes';
import BackendError from './BackendError';

const defaultServerMsg = 'Something went wrong';

export default class GeneralError extends BackendError {
  statusCode: number;

  constructor(message = defaultServerMsg) {
    super(message);
    this.statusCode = SERVER_ERROR;
    this.name = 'GeneralError';

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#custom_error_types
    Object.setPrototypeOf(this, GeneralError.prototype);
  }
}
