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
  const { username } = req.user;

  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(StatusCodes.OK).json({
    msg: `Hello ${username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };
