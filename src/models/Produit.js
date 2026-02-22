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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Utilisateur',
    required: true
  },
  nombre: {
    type: Number,
    required: true
  },
  categorie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categorie',
    required: true
  },
  image: {
    type: String,
    default: null
  }
  
});

module.exports = mongoose.model('Produit', produitSchema);