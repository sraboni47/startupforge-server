const express = require("express");
const { toNodeHandler } = require("better-auth/node");
const auth = require("../lib/auth");

const router = express.Router();

router.use(toNodeHandler(auth));

module.exports = router;