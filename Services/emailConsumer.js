const amqp = require("amqplib");

exports.initConsumer = async () => {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();
  await channel.assertQueue("emailQueue");

  channel.consume("emailQueue", (message) => {
    console.log(`Email Notification: ${message.content.toString()}`);
    channel.ack(message);
  });
};
