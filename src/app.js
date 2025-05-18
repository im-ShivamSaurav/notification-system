require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const notificationRoutes = require('./routes/notificationRoutes');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/notifications', notificationRoutes);
app.use('/users', notificationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
