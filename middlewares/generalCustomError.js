const { StatusCodes } = require("http-status-codes");
const { CustomAPIError } = require("../errors");

const generalCustomError = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res
      .status(err.statusCode)
      .json({ status: "error", msg: err.message });
  }

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send("An error occurred...");
};

module.exports = generalCustomError;
