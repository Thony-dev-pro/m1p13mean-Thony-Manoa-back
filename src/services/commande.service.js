const Commande = require('../models/Commande');
const Stock = require('../models/Stock');
const { ETAT } = require('../constant/commande');
const { ETAT: ETAT_STOCK } = require('../constant/stock');

const createInitialCommande = async (produits, utilisateurId, lieu) => {
  const newCommande = new Commande({
    date: new Date(),
    produits: produits,
    utilisateur: utilisateurId,
    etat: ETAT.A_VALIDER,
    lieu: lieu
  });

  const stockEntries = produits.map(produit => ({
    produit: produit.produit,
    prix: produit.prix,
    nombre: produit.nombre,
    etat: ETAT_STOCK.VENTE,
    date: new Date()
  }));

  const [savedCommande] = await Promise.all([
    newCommande.save(),
    Stock.insertMany(stockEntries)
  ]);

  return savedCommande;
};

const validateCommande = async (commandeId) => {
  const updatedCommande = await Commande.findByIdAndUpdate(
    commandeId,
    { etat: ETAT.PAYER },
    { new: true }
  );
  return updatedCommande;
};

const canceledCommande = async (commandeId) => {
  const commande = await Commande.findById(commandeId);
  
  if (!commande) {
    throw new Error('Commande non trouvée');
  }

  const stockEntries = commande.produits.map(produit => ({
    produit: produit.produit,
    prix: produit.prix,
    nombre: produit.nombre,
    etat: ETAT_STOCK.AJOUT,
    date: new Date()
  }));

  const [updatedCommande] = await Promise.all([
    Commande.findByIdAndUpdate(commandeId, { etat: ETAT.ANNULE }, { new: true }),
    Stock.insertMany(stockEntries)
  ]);

  return updatedCommande;
};

module.exports = {
  createInitialCommande,
  validateCommande,
  canceledCommande
};