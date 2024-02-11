const jwt = require("jsonwebtoken");
const { Unauthenticated } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const authentication = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Unauthenticated("No token provided...");
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_TKN);
    const { id, username } = decoded;
    req.user = { id, username };
    next();
  } catch (error) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: `Not authorized to access the route...` });
  }
};

module.exports = authentication;
