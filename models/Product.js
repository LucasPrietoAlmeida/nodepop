const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    owner: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    price: { type: Number, required: true },
    tags: [{ type: String, enum: ['work', 'lifestyle', 'motor', 'mobile'] }]
});

module.exports = mongoose.model('Product', productSchema);