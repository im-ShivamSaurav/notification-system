const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

module.exports = async (notif) => {
  if (notif.type !== 'email') return;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: notif.userId,
    subject: notif.title,
    text: notif.message
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${notif.userId}`);
  } catch (error) {
    console.error('Email send failed', error);
  }
};
