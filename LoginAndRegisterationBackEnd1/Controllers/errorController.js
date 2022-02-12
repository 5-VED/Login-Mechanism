//Method to call when api calls succesfully
module.exports.ReS = (res, data, code) => {
  return res.status(code).json({ response: { data: data, code: code } });
};

//Method to call when error occurs
module.exports.ReE = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    error: {
      status: err.status,
      statusCode: err.statusCode,
      message: err.message,
    },
  });
};
