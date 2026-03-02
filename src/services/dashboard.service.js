const Commande = require('../models/Commande');
const Stock = require('../models/Stock');
const Utilisateur = require('../models/Utilisateur');
const { ETAT: ETAT_STOCK } = require('../constant/stock');
const { TYPE } = require('../constant/utilisateur');

const getDashboardStats = async (dateDebut, dateFin) => {
  // Par défaut : mois en cours
  if (!dateDebut && !dateFin) {
    const now = new Date();
    dateDebut = new Date(now.getFullYear(), now.getMonth(), 1); // Premier jour du mois
    dateFin = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59); // Dernier jour du mois
  }

  const dateFilter = {};
  if (dateDebut || dateFin) {
    dateFilter.date = {};
    if (dateDebut) dateFilter.date.$gte = new Date(dateDebut);
    if (dateFin) dateFilter.date.$lte = new Date(dateFin);
  }

  const [venteParBoutique, totalCommandes, totalBoutiques, totalAcheteurs, boutiquesActives] = await Promise.all([
    getVenteParBoutique(dateFilter),
    Commande.countDocuments(dateFilter),
    Utilisateur.countDocuments({ type: TYPE.BOUTIQUE }),
    Utilisateur.countDocuments({ type: TYPE.ACHETEUR }),
    getBoutiquesActives(dateFilter)
  ]);

  return {
    venteParBoutique,
    totalCommandes,
    totalBoutiques,
    totalAcheteurs,
    boutiquesActives,
    periode: {
      dateDebut: dateDebut || null,
      dateFin: dateFin || null
    }
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

const getBoutiquesActives = async (dateFilter) => {
  const matchStage = { etat: ETAT_STOCK.VENTE };
  if (dateFilter.date) {
    matchStage.date = dateFilter.date;
  }

  const result = await Stock.aggregate([
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
        _id: '$produitInfo.boutique'
      }
    },
    { $count: 'total' }
  ]);

  return result.length > 0 ? result[0].total : 0;
};

module.exports = {
  getDashboardStats
};
