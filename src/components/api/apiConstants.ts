export const BASE_URL = 'https://httpstat.us';

export const HTTP_STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

export const NETWORK_ERROR = "Network error. Please check your connection"
export const HTTP_ERROR = "HTTP error!"
export const SUCCESS = 'SUCCESS';
export const ERROR = 'ERROR';

// Error messages corresponding to HTTP status codes
export const ERROR_MESSAGES = {
  [HTTP_STATUS.BAD_REQUEST]: 'Bad Request. Please check your input',
  [HTTP_STATUS.UNAUTHORIZED]: 'Unauthorized',
  [HTTP_STATUS.FORBIDDEN]: 'Forbidden. You do not have permission',
  [HTTP_STATUS.NOT_FOUND]: 'Not Found. The resource does not exist',
  [HTTP_STATUS.INTERNAL_SERVER_ERROR]: 'Server error. Please try again later',
  [HTTP_STATUS.SERVICE_UNAVAILABLE]: 'Service unavailable. Please try again later',
  DEFAULT: 'An unexpected error occurred.',
};

// HTTP methods
export const HTTP_METHODS = {
  POST: 'POST',
  GET: 'GET',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

// Headers
export const HEADERS = {
  CONTENT_TYPE: 'Content-Type',
  APPLICATION_JSON: 'application/json',
};
