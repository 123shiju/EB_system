const express = require("express");
const { createEvent } = require("../Controllers/EventController");
const router = express.Router();

router.post("/create", createEvent);

module.exports = router;
