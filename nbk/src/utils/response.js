const successResponse = (res, data, message = 'Success') => {
  return res.status(200).json({
    success: true,
    message,
    data
  });
};

const errorResponse = (res, error, status = 500) => {
  return res.status(status).json({
    success: false,
    message: error.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error : undefined
  });
};

module.exports = {
  successResponse,
  errorResponse
}; 