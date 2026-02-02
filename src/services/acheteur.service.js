const bcrypt = require('bcrypt');
const Utilisateur = require('../models/Utilisateur');
const { TYPE, ETAT } = require('../constant/utilisateur');

const registration = async (userData) => {
  const { nom, mail, contact, mdp } = userData;
  
  if (!nom) {
    throw new Error('Le nom est requis');
  }
  if (!mail) {
    throw new Error('Le mail est requis');
  }
  if (!contact) {
    throw new Error('Le contact est requis');
  }
  if (!mdp) {
    throw new Error('Le mot de passe est requis');
  }
  
  const hashedPassword = await bcrypt.hash(mdp, 10);
  
  const newUser = new Utilisateur({
    nom,
    mail,
    contact,
    mdp: hashedPassword,
    type: TYPE.ACHETEUR,
    etat: ETAT.ACTIF
  });
  
  return await newUser.save();
};

module.exports = {
  registration
};