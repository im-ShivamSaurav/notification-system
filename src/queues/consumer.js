const amqp = require('amqplib');
const sendEmail = require('../services/emailService');

(async () => {
  const connection = await amqp.connect(process.env.RABBITMQ_URL);
  const channel = await connection.createChannel();
  await channel.assertQueue('notifications');

  channel.consume('notifications', async (msg) => {
    const notif = JSON.parse(msg.content.toString());
    await sendEmail(notif);
    channel.ack(msg);
  });
})();
