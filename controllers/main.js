const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const { Unauthenticated } = require("../errors");

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new Unauthenticated("Please provide username and password");
  }

  const id = new Date().getTime();
  const token = jwt.sign({ id, username }, process.env.JWT_TKN, {
    expiresIn: "2d",
  });

  res.status(StatusCodes.OK).json({ msg: `Welcome ${username}`, token });
};

const dashboard = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Unauthenticated("No token provided...");
  }

  const token = authHeader.split(" ")[1];
  try {
    const luckyNumber = Math.floor(Math.random() * 100);
    const decode = jwt.verify(token, process.env.JWT_TKN);

    res.status(StatusCodes.OK).json({
      msg: `Hello ${decode.username}`,
      secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
    });
  } catch (error) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: `Not authorized to access the route...` });
  }
};

module.exports = { login, dashboard };
