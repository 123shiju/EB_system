const db = require("./db");

exports.createBooking = async (username, userId, eventId, numAttendees) => {
  const query =
    "INSERT INTO bookings (username, user_id, event_id, num_attendees) VALUES (?, ?, ?, ?)";
  return db.execute(query, [username, userId, eventId, numAttendees]);
};

exports.getBookingCount = async (eventId) => {
  const query = "SELECT COUNT(*) AS count FROM bookings WHERE event_id = ?";
  const [rows] = await db.execute(query, [eventId]);
  return rows[0].count;
};

exports.isUserAlreadyBooked = async (userId, eventId) => {
  const query =
    "SELECT COUNT(*) AS count FROM bookings WHERE user_id = ? AND event_id = ?";
  const [rows] = await db.execute(query, [userId, eventId]);
  return rows[0].count > 0;
};
