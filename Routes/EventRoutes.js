const express = require("express");
const { createEvent, getEvents } = require("../Controllers/EventController");
const router = express.Router();

router.post("/create", createEvent);
router.get("/dispaly", getEvents);

module.exports = router;
