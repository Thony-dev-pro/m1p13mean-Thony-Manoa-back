const mongoose = require('mongoose');

const commandeSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  produits: [{
    produit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Produit',
      required: true
    },
    boutique: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Utilisateur',
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
    prixTotal: {
      type: Number,
      required: true
    }
  }],
  utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Utilisateur',
    required: true
  },
  etat: {
    type: Number,
    required: true,
    enum: [0, 1, 2]
  },
  prixTotal: {
    type: Number,
    required: true
  },
  lieu: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Commande', commandeSchema);