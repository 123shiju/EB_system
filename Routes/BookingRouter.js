const express = require("express");
const { bookEvent } = require("../Controllers/BookingControllers");
const router = express.Router();

router.post("/book", bookEvent);

module.exports = router;
