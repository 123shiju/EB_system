const express = require("express");
const {
  bookEvent,
  getBookingCount,
} = require("../Controllers/BookingControllers");
const router = express.Router();

router.post("/book", bookEvent);
// router.get("/:eventId/bookings", getBookings);
router.get("/:eventId/count", getBookingCount);

module.exports = router;
