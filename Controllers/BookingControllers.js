const { createBooking, getBookingCount } = require("../Models/BookingModel");
const {
  setCache,
  getCache,
  invalidateCache,
} = require("../Services/redisService");
const { sendMessage } = require("../Services/rabbitMQService");
const { getEventCapacity } = require("../Models/EventModel");

exports.bookEvent = async (req, res) => {
  try {
    const { userId, eventId } = req.body;

    const cachedCount = await getCache(`event:${eventId}:count`);
    let currentCount = cachedCount
      ? parseInt(cachedCount)
      : await getBookingCount(eventId);

    const capacity = await getEventCapacity(eventId);

    if (currentCount >= capacity) {
      return res.status(400).send("Event is fully booked.");
    }

    await createBooking(userId, eventId);
    currentCount += 1;

    await setCache(`event:${eventId}:count`, currentCount);
    await sendMessage(
      `Booking confirmed for user ${userId} on event ${eventId}`
    );

    res.status(201).send("Booking successful.");
  } catch (error) {
    res.status(500).send("Error booking event.");
  }
};
