const {
  findEventByName,
  createEvent,
  getAllEvents,
} = require("../Models/EventModel");

exports.createEvent = async (req, res) => {
  try {
    const { name, capacity } = req.body;

    const existingEvent = await findEventByName(name);
    if (existingEvent) {
      return res.status(409).send("Event already exists.");
    }

    await createEvent(name, capacity);

    res.status(201).send("Event created successfully.");
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).send("Error creating event.");
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await getAllEvents();
    return res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Error fetching events." });
  }
};
