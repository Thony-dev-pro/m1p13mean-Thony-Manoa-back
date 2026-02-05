const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const utilisateurSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  mdp: {
    type: String,
    required: true,
  },
  type: {
    type: Number,
    required: true,
  },
  etat: {
    type: Number,
    required: true,
  },
});

utilisateurSchema.pre('save', async function(next) {

  if (!this.isModified('mdp')) return next();

  this.mdp = await bcrypt.hash(this.mdp, 10);
  next();
});

module.exports = mongoose.model("Utilisateur", utilisateurSchema);
