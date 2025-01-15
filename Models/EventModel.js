const db = require("./db");

exports.createEvent = async (name, capacity) => {
  const query = "INSERT INTO events (name, capacity) VALUES (?, ?)";
  return db.execute(query, [name, capacity]);
};

exports.getEventCapacity = async (eventId) => {
  const query = "SELECT capacity FROM events WHERE id = ?";
  const [rows] = await db.execute(query, [eventId]);
  return rows[0]?.capacity || null;
};
