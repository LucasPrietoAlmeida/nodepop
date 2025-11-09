require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const connectMongoose = require('./lib/connectMongoose');

const products = [
    { name: 'iPhone 13', owner: 'lucas', price: 900, tags: ['mobile'] },
    { name: 'MacBook Pro', owner: 'lucas', price: 2000, tags: ['work', 'lifestyle'] }
];

async function initDB() {
    await connectMongoose();
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log('Database initialized with sample data');
    mongoose.connection.close();
}

initDB();