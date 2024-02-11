const express = require("express");
const router = express.Router();
const { dashboard, login } = require("../controllers/main");

// Application routes
router.route("/dashboard").get(dashboard);
router.route("/login").post(login);

module.exports = router;
