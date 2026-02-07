const mongoose = require('mongoose');

const produitSchema = new mongoose.Schema({
  nomProduit: {
    type: String,
    required: true
  },
  prix: {
    type: Number,
    required: true
  },
  boutique: {
    type: String,
    required: true
  },
  nombre: {
    type: Number,
    required: true
  },
  boutique: {
    type: String,
    required: true
  },
   categorie: {
    type: String,
    required: true
  },
  
});

module.exports = mongoose.model('Categorie', produitSchema);