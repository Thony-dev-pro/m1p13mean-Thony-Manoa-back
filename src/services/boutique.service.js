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
    type: TYPE.BOUTIQUE,
    etat: ETAT.A_VALIDER
  });
  
  return await newUser.save();
};

const validateBoutique = async (userId) => {
  try {
    const updatedUser = await Utilisateur.findByIdAndUpdate(
      userId,
      { etat: ETAT.ACTIF },
      { new: true }
    );
    return updatedUser;
  } catch (error) {
    throw error;
  }
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
    type: TYPE.BOUTIQUE 
  });
  
  if (!user) {
    throw new Error('Utilisateur non trouvé');
  }

  const isPasswordValid = await bcrypt.compare(mdp, user.mdp);
  if (!isPasswordValid) {
    throw new Error('Mot de passe incorrect');
  }

  if (user.etat !== ETAT.ACTIF) {
    throw new Error('Compte non activé');
  }

  return {
    _id: user._id,
    nom: user.nom,
    mail: user.mail,
    contact: user.contact,
    type: user.type,
    etat: user.etat
  };
};

module.exports = {
  registration,
  validateBoutique,
  login
};