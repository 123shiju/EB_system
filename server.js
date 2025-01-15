const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const eventRoutes = require("./Routes/EventRoutes");
const bookingRoutes = require("./Routes/BookingRouter");

const { initRabbitMQ } = require("./Services/rabbitMQService");
const { initConsumer } = require("./Services/emailConsumer");

const app = express();
app.use(bodyParser.json());
app.use("/events", eventRoutes);
app.use("/bookings", bookingRoutes);

const PORT = process.env.PORT || 3000;

initRabbitMQ().then(() => console.log("RabbitMQ initialized."));
initConsumer().then(() => console.log("RabbitMQ Consumer initialized."));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
PORT;
