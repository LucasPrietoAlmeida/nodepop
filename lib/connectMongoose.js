const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connection.on('error', err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
});

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});

async function connectMongoose() {
    await mongoose.connect(process.env.MONGODB_URI);
}

module.exports = connectMongoose;
