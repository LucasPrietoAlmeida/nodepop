require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const connectMongoose = require('../lib/connectMongoose');

(async () => {
    await connectMongoose();
    await User.deleteMany();
    await User.create({ email: 'test@nodepop.com', password: '1234' });
    console.log('Usuario creado: test@nodepop.com / 1234');
    await User.create({ email: 'lucas@nodepop.com', password: 'lucas' });
    console.log('Usuario creado: lucas@nodepop.com / lucas');
    mongoose.connection.close();
})();
