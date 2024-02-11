require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const mainRouter = require("./routes/main");
const notFoundError = require("./middlewares/notFoundError");
const generalErrorHandler = require("./middlewares/generalCustomError");

// middlewares
app.use(express.json());
app.use("/api/v1", mainRouter);

// error handling middleware
app.use(notFoundError);
app.use(generalErrorHandler);

// app listening port
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}...`);
});
