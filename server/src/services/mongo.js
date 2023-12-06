const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const MONGO_URL = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.ay7g6bt.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (err) => {
  console.error(err);
});

async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
}

module.exports = { mongoConnect };
