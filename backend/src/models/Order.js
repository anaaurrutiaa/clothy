
const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  size: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  }
});

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: {
    type: [orderItemSchema],
    required: true,
    validate: {
      validator: function(items) {
        return items.length > 0;
      },
      message: 'El pedido debe contener al menos un producto'
    }
  },
  total: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['pendiente', 'confirmado', 'enviado', 'entregado'],
    default: 'pendiente'
  },
  shippingAddress: {
    street: String,
    number: String,
    neighborhood: String,
    postalCode: String,
    state: String,
    phone: String
  },
  paymentMethod: {
    type: String,
    enum: ['tarjeta', 'paypal', 'simulado'],
    default: 'simulado'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
