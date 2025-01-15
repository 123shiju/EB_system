const amqp = require("amqplib");

let channel, connection;

exports.initRabbitMQ = async () => {
  connection = await amqp.connect("amqp://localhost");
  channel = await connection.createChannel();
  await channel.assertQueue("emailQueue");
};

exports.sendMessage = async (message) => {
  await channel.sendToQueue("emailQueue", Buffer.from(message));
};

exports.closeConnection = async () => {
  await channel.close();
  await connection.close();
};
