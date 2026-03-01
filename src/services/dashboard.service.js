const Commande = require('../models/Commande');
const Stock = require('../models/Stock');
const Utilisateur = require('../models/Utilisateur');
const { ETAT: ETAT_STOCK } = require('../constant/stock');
const { TYPE } = require('../constant/utilisateur');

const getDashboardStats = async (dateDebut, dateFin) => {
  const dateFilter = {};
  if (dateDebut || dateFin) {
    dateFilter.date = {};
    if (dateDebut) dateFilter.date.$gte = new Date(dateDebut);
    if (dateFin) dateFilter.date.$lte = new Date(dateFin);
  }

  const [venteParBoutique, totalCommandes, totalBoutiques, totalAcheteurs] = await Promise.all([
    getVenteParBoutique(dateFilter),
    Commande.countDocuments(dateFilter),
    Utilisateur.countDocuments({ type: TYPE.BOUTIQUE }),
    Utilisateur.countDocuments({ type: TYPE.ACHETEUR })
  ]);

  return {
    venteParBoutique,
    totalCommandes,
    totalBoutiques,
    totalAcheteurs
  };
};

const getVenteParBoutique = async (dateFilter) => {
  const matchStage = { etat: ETAT_STOCK.VENTE };
  if (dateFilter.date) {
    matchStage.date = dateFilter.date;
  }

  return await Stock.aggregate([
    { $match: matchStage },
    {
      $lookup: {
        from: 'produits',
        localField: 'produit',
        foreignField: '_id',
        as: 'produitInfo'
      }
    },
    { $unwind: '$produitInfo' },
    {
      $group: {
        _id: '$produitInfo.boutique',
        nombreVentes: { $sum: '$nombre' },
        chiffreAffaires: { $sum: { $multiply: ['$prix', '$nombre'] } }
      }
    },
    {
      $lookup: {
        from: 'utilisateurs',
        localField: '_id',
        foreignField: '_id',
        as: 'boutiqueInfo'
      }
    },
    { $unwind: '$boutiqueInfo' },
    {
      $project: {
        _id: 1,
        boutique: '$boutiqueInfo.nom',
        nombreVentes: 1,
        chiffreAffaires: 1
      }
    },
    { $sort: { chiffreAffaires: -1 } }
  ]);
};

module.exports = {
  getDashboardStats
};
