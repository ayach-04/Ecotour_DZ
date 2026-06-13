const express = require("express");
const { getHomeContent } = require("../controllers/homeController");

const router = express.Router();

router.get("/home", getHomeContent);

module.exports = router;
