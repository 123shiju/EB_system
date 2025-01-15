const { createEvent } = require("../Models/EventModel");

exports.createEvent = async (req, res) => {
  try {
    const { name, capacity } = req.body;
    await createEvent(name, capacity);
    res.status(201).send("Event created successfully.");
  } catch (error) {
    res.status(500).send("Error creating event.");
  }
};
