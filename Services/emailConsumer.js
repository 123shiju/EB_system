const { initRabbitMQ, getChannel } = require("../Services/rabbitMQService");

async function initConsumer() {
  try {
    let channel = await initRabbitMQ();

    if (channel) {
      channel.consume("emailQueue", (message) => {
        try {
          console.log(`Email Notification: ${message.content.toString()}`);
          channel.ack(message);
        } catch (err) {
          console.error("Error processing message:", err);

          channel.nack(message, false, false);
        }
      });

      console.log("Waiting for messages in 'emailQueue'...");
    } else {
      console.error("RabbitMQ channel is still not available.");
    }
  } catch (err) {
    console.error("Error initializing consumer:", err);
  }
}

initConsumer();

module.exports = { initConsumer };
