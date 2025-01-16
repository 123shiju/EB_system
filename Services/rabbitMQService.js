const amqp = require("amqplib");

let channel, connection;

async function initRabbitMQ() {
  try {
    connection = await amqp.connect("amqp://localhost");
    channel = await connection.createChannel();
    await channel.assertQueue("emailQueue", { durable: true });
    console.log("RabbitMQ initialized and queue 'emailQueue' is ready.");
    return channel;
  } catch (err) {
    console.error("Error initializing RabbitMQ:", err);
    throw err;
  }
}

async function sendMessage(message) {
  try {
    if (!channel) {
      console.log("RabbitMQ channel not initialized. Initializing now...");
      channel = await initRabbitMQ();
    }
    const sent = await channel.sendToQueue("emailQueue", Buffer.from(message), {
      persistent: true,
    });
    if (sent) {
      console.log(`Message sent successfully: ${message}`);
    } else {
      console.error(`Message failed to send: ${message}`);
    }
  } catch (err) {
    console.error("Error sending message to RabbitMQ:", err);
  }
}

async function closeConnection() {
  try {
    if (channel) {
      await channel.close();
    }
    if (connection) {
      await connection.close();
    }
    console.log("RabbitMQ connection closed.");
  } catch (err) {
    console.error("Error closing RabbitMQ connection:", err);
  }
}

module.exports = {
  initRabbitMQ,
  sendMessage,
  closeConnection,
  getChannel: () => channel,
};
