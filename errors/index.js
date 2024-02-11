const CustomAPIError = require("./customError");
const BadRequest = require("./BadRequestError");
const Unauthenticated = require("./UnauthenticatedError");

module.exports = { CustomAPIError, BadRequest, Unauthenticated };
