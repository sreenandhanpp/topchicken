const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    branch:{
        type: String,
        required: true,
    },
    orderCreationDate: {
        type: Date,
        default: Date.now
    },
    product: {
        type: String,
        required: true
    },
    flavour: {
        type: String
    },
    size: {
        type: String
    },
    qty: {
        type: Number,
        required: true
    },
    expectedDate: {
        type: Date
    },
    orderedBy: {
        type: String,
        required: true
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
