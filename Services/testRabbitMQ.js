const rabbitService = require("./rabbitMQService");

async function testRabbitMQ() {
  await rabbitService.initRabbitMQ();
  await rabbitService.sendMessage("Hello, this is a test message!");
  await rabbitService.closeConnection();
}

testRabbitMQ().catch((err) => console.error("Test failed:", err));
