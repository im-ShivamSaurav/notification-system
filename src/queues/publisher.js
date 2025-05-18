const amqp = require('amqplib');

let channel;
const QUEUE = 'notifications';

(async () => {
  const connection = await amqp.connect(process.env.RABBITMQ_URL);
  channel = await connection.createChannel();
  await channel.assertQueue(QUEUE);
})();

exports.enqueueNotification = (notif) => {
  if (channel) {
    channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(notif)));
  }
};
