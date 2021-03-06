const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const items = require('./routes/api/items');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

// DB Config

const db = process.env.DB_URI;

// Connect to Mongo
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

// Use routes
app.use('/api/items', items);

// Serve Static Assets if in Production

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Ports

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
