// Middleware for error handling for 404 status (catch-all for routes that don't exist)
export const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    message: '404: Route Not Found.',
    error: 'The requested route does not exist.',
  });
};
