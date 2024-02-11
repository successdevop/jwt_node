const express = require("express");
const router = express.Router();
const { dashboard, login } = require("../controllers/main");
const authentication = require("../middlewares/auth");

// Application routes
router.route("/dashboard").get(authentication, dashboard);
router.route("/login").post(login);

module.exports = router;
