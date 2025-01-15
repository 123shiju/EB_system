const db = require("./db");

exports.createBooking = async (userId, eventId) => {
  const query = "INSERT INTO bookings (user_id, event_id) VALUES (?, ?)";
  return db.execute(query, [userId, eventId]);
};

exports.getBookingCount = async (eventId) => {
  const query = "SELECT COUNT(*) AS count FROM bookings WHERE event_id = ?";
  const [rows] = await db.execute(query, [eventId]);
  return rows[0].count;
};
