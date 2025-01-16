const {
  setCache,
  getCache,
  invalidateCache,
} = require("../Services/redisService");
const { sendMessage } = require("../Services/rabbitMQService");
const {
  createBooking,
  getBookingCount,
  isUserAlreadyBooked,
} = require("../Models/BookingModel");

const { getEventCapacity } = require("../Models/EventModel");

exports.bookEvent = async (req, res) => {
  try {
    const { username, userId, eventId, numAttendees } = req.body;

    const isAlreadyBooked = await isUserAlreadyBooked(userId, eventId);
    if (isAlreadyBooked) {
      return res.status(409).send("You have already booked this event.");
    }

    const cachedCount = await getCache(`event:${eventId}:count`);
    let currentCount = cachedCount
      ? parseInt(cachedCount)
      : await getBookingCount(eventId);

    const capacity = await getEventCapacity(eventId);

    if (currentCount + numAttendees > capacity) {
      return res.status(400).send("Not enough space for that many attendees.");
    }

    await createBooking(username, userId, eventId, numAttendees);
    currentCount += numAttendees;

    await setCache(`event:${eventId}:count`, currentCount);
    await sendMessage(
      `Booking confirmed for user ${username} (ID: ${userId}) on event ${eventId} with ${numAttendees} attendees`
    );

    res.status(201).send("Booking successful.");
  } catch (error) {
    console.error("Error booking event:", error);
    res.status(500).send("Error booking event.");
  }
};

exports.getBookingCount = async (req, res) => {
  const eventId = req.params.eventId;

  try {
    const cachedCount = await getCache(`event:${eventId}:booking_count`);

    if (cachedCount) {
      return res
        .status(200)
        .json({ eventId, bookingCount: parseInt(cachedCount) });
    }

    const bookingCount = await getBookingCount(eventId);
    await setCache(`event:${eventId}:booking_count`, bookingCount, "EX", 3600);

    return res.status(200).json({ eventId, bookingCount });
  } catch (err) {
    return res.status(500).json({ message: "Error fetching booking count" });
  }
};
