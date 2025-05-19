
# 📬 Notification Service

A simple Node.js-based notification service to send **Email**, **SMS**, and **In-App** notifications to users.

---

## 🚀 Features

- 📧 Send Email Notifications (via Nodemailer)
- 📱 Send SMS Notifications (via Twilio)
- 🛎️ Store In-App Notifications in MongoDB
- 🧵 Optional Queue-based Processing (RabbitMQ)
- 🔁 Retry Logic for Failed Notifications (WIP)
- 📖 REST API Endpoints

---

## 🛠️ Tech Stack

- **Node.js + Express**
- **MongoDB (Mongoose)**
- **Nodemailer** for Email
- **Twilio** for SMS
- **RabbitMQ** for optional queuing

---

## 📂 API Endpoints

### 1. Send a Notification
\`\`\`
POST /notifications
\`\`\`

#### Request Body:
\`\`\`json
{
  "userIds": ["user@example.com" or "+91XXXXXXXXXX"],
  "type": "email" | "sms" | "in-app",
  "title": "Your Title",
  "message": "Your Message"
}
\`\`\`

### 2. Get User Notifications
\`\`\`
GET /users/{id}/notifications
\`\`\`
- \`id\` can be the email or phone number used to identify the user.

---

## 🧪 Setup Instructions

### 1. Clone the Repository

\`\`\`bash
git clone <your-repo-url>
cd notification-service
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 3. Set Up Environment Variables

Create a \`.env\` file in the root directory:

\`\`\`env
PORT=5000
MONGO_URI=mongodb://localhost:27017/notifications

# Email config
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_app_password

# Twilio config (for SMS)
TWILIO_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE=+1234567890

# RabbitMQ config
RABBITMQ_URL=amqp://localhost
USE_QUEUE=false
\`\`\`

> ℹ️ **Note**: To send emails using Gmail, enable 2FA and use an app password.

### 4. Start MongoDB

Ensure MongoDB is running locally or provide an Atlas connection URI.

\`\`\`bash
# For local MongoDB
mongod
\`\`\`

### 5. Run the Server

\`\`\`bash
npm start
\`\`\`

### 6. (Optional) Start Queue Consumer

If \`USE_QUEUE=true\`, run:

\`\`\`bash
node src/queues/consumer.js
\`\`\`

---

## 🧾 Assumptions Made

- \`userId\` is assumed to be either:
  - Email (for email + in-app notifications)
  - Phone number in international format (for SMS)
- Notification types are only:
  - \`"email"\` for Email via SMTP
  - \`"sms"\` for SMS via Twilio
  - \`"in-app"\` for internal storage only (no third-party sending)
- SMTP uses Gmail's service via Nodemailer
- No authentication or rate limiting is implemented (to keep the scope simple)
- Queueing with RabbitMQ is optional but ready to plug and play

---

## 📎 Sample Requests (Postman or curl)

### Send Email Notification:
\`\`\`bash
curl -X POST http://localhost:5000/notifications \\
  -H "Content-Type: application/json" \\
  -d '{"userIds":["test@example.com"],"type":"email","title":"Hello","message":"Welcome!"}'
\`\`\`

### Get Notifications:
\`\`\`bash
curl http://localhost:5000/users/test@example.com/notifications
\`\`\`

---

## 📦 Folder Structure

\`\`\`
notification-service/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── queues/
│   ├── routes/
│   └── services/
├── .env
├── .gitignore
├── README.md
└── package.json
\`\`\`

---

## 👨‍💻 Author

**Shivam Saurav**  

