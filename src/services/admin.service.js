const bcrypt = require('bcrypt');
const Utilisateur = require('../models/Utilisateur');
const { TYPE, ETAT, SALT } = require('../constant/utilisateur');

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
  
  const hashedPassword = await bcrypt.hash(mdp, SALT);
  
  const newUser = new Utilisateur({
    nom,
    mail,
    contact,
    mdp: hashedPassword,
    type: TYPE.ADMIN,
    etat: ETAT.ACTIF
  });
  
  return await newUser.save();
};

const login = async (mail, mdp) => {
  if (!mail) {
    throw new Error('Le mail est requis');
  }
  if (!mdp) {
    throw new Error('Le mot de passe est requis');
  }

  const user = await Utilisateur.findOne({ 
    mail, 
    type: TYPE.ADMIN 
  });
  
  if (!user) {
    throw new Error('Utilisateur non trouvé');
  }

  const isPasswordValid = await bcrypt.compare(mdp, user.mdp);
  if (!isPasswordValid) {
    throw new Error('Mot de passe incorrect');
  }

  return user;
};

module.exports = {
  registration,
  login
};