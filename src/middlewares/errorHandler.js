import { HttpError } from 'http-errors';

// Middleware for error handling for 500 status
export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err instanceof HttpError) {
    res.status(err.status).json({
      status: err.status,
      message: err.name,
      data: err,
    });
    return;
  }

  res.status(500).json({
    message: '500: Server error, please try again later.',
    error: err.message || 'Unknown error occurred.',
  });
  next();
};
