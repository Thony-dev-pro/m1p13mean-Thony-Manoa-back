const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  produit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Produit',
    required: true
  },
  prix: {
    type: Number,
    required: true
  },
  nombre: {
    type: Number,
    required: true
  },
  etat: {
    type: Number,
    required: true,
    enum: [0, 1]
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = mongoose.model('Stock', stockSchema);