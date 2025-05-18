const Notification = require('../models/Notification');
const sendEmail = require('../services/emailService');
const { enqueueNotification } = require('../queues/publisher');

exports.sendNotification = async (req, res) => {
  const { userIds, type, title, message } = req.body;

  try {
    const notifications = await Promise.all(userIds.map(async userId => {
      const notif = await Notification.create({ userId, type, title, message });
      if (process.env.USE_QUEUE === 'true') {
        enqueueNotification(notif);
      } else {
        sendEmail(notif);
      }
      return notif;
    }));

    res.status(201).json({ success: true, notifications });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to send notification' });
  }
};

exports.getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.params.userId });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
};
