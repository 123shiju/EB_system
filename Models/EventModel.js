const db = require("./db");

exports.findEventByName = async (name) => {
  const query = "SELECT * FROM events WHERE name = ?";
  const [rows] = await db.execute(query, [name]);
  return rows.length > 0 ? rows[0] : null;
};

exports.createEvent = async (name, capacity) => {
  const query = "INSERT INTO events (name, capacity) VALUES (?, ?)";
  return db.execute(query, [name, capacity]);
};

exports.getAllEvents = async () => {
  const query = "SELECT * FROM events";
  const [rows] = await db.execute(query);
  return rows;
};

exports.getEventCapacity = async (eventId) => {
  const query = "SELECT capacity FROM events WHERE id = ?";
  const [rows] = await db.execute(query, [eventId]);
  return rows.length > 0 ? rows[0].capacity : null;
};
