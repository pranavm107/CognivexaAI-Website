import { StatusCodes } from 'http-status-codes';
import ApiError from '../utils/ApiError.js';

const validate = (schema) => (req, res, next) => {
  const validSchema = schema.parse ? schema : null;
  if (!validSchema) return next();

  try {
    const { body, query, params } = req;
    schema.parse({ body, query, params });
    next();
  } catch (err) {
    const errorMessage = err.errors.map((details) => details.message).join(', ');
    return next(new ApiError(StatusCodes.BAD_REQUEST, errorMessage));
  }
};

export default validate;
