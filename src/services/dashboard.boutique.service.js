const Commande = require('../models/Commande');
const mongoose = require('mongoose');

const countOrdersByEtatAndBoutique = async (etat, boutiqueId, startDate, endDate) => {
  const filter = { 
    etat,
    'produits.boutique': boutiqueId
  };

  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);
    filter.date = { $gte: start, $lte: end };
  }

  console.log(filter.date)
  
  const a = await Commande.countDocuments(filter);
  return a;
};

const sumPrixTotalByEtatAndBoutique = async (etat, boutiqueId) => {
  const result = await Commande.aggregate([
    {
      $match: {
        etat,
        'produits.boutique': new mongoose.Types.ObjectId(boutiqueId)
      }
    },
    {
      $group: {
        _id: null,
        total: { $sum: '$prixTotal' }
      }
    }
  ]);
  return result.length > 0 ? result[0].total : 0;
};

const sumPrixTotalCurrentMonthByEtatAndBoutique = async (etat, boutiqueId) => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);


  const result = await Commande.aggregate([
    {
      $match: {
        etat,
        'produits.boutique': new mongoose.Types.ObjectId(boutiqueId),
        date: { $gte: startOfMonth, $lte: endOfMonth }
      }
    },
    {
      $group: {
        _id: null,
        total: { $sum: '$prixTotal' }
      }
    }
  ]);
  return result.length > 0 ? result[0].total : 0;
};

const getBestProductByBoutique = async (boutiqueId) => {
  const mongoose = require('mongoose');
  const { ETAT } = require('../constant/commande');
  
  const result = await Commande.aggregate([
    { $unwind: '$produits' },
    {
      $match: {
        'produits.boutique': new mongoose.Types.ObjectId(boutiqueId),
        etat: ETAT.PAYER
      }
    },
    {
      $group: {
        _id: '$produits.produit',
        totalNombre: { $sum: '$produits.nombre' },
        totalRevenue: { $sum: '$produits.prixTotal' }
      }
    },
    {
      $lookup: {
        from: 'produits',
        localField: '_id',
        foreignField: '_id',
        as: 'produitInfo'
      }
    },
    { $unwind: '$produitInfo' },
    { $sort: { totalNombre: -1 } },
    { $limit: 1 }
  ]);
  
  return result.length > 0 ? result[0] : null;
};

const getAllProductsSalesByBoutique = async (boutiqueId) => {
  const { ETAT } = require('../constant/commande');
  
  const result = await Commande.aggregate([
    { $unwind: '$produits' },
    {
      $match: {
        'produits.boutique': new mongoose.Types.ObjectId(boutiqueId),
        etat: ETAT.PAYER
      }
    },
    {
      $group: {
        _id: '$produits.produit',
        totalNombre: { $sum: '$produits.nombre' },
        totalRevenue: { $sum: '$produits.prixTotal' }
      }
    },
    {
      $lookup: {
        from: 'produits',
        localField: '_id',
        foreignField: '_id',
        as: 'produitInfo'
      }
    },
    { $unwind: '$produitInfo' },
    { $sort: { totalNombre: -1 } }
  ]);
  
  return result;
};

const getSalesByMonthByBoutique = async (boutiqueId) => {
  const { ETAT } = require('../constant/commande');
  
  const currentYear = new Date().getFullYear();
  const startOfYear = new Date(currentYear, 0, 1);
  const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59, 999);
  
  const result = await Commande.aggregate([
    { $unwind: '$produits' },
    {
      $match: {
        'produits.boutique': new mongoose.Types.ObjectId(boutiqueId),
        etat: ETAT.PAYER,
        date: { $gte: startOfYear, $lte: endOfYear }
      }
    },
    {
      $group: {
        _id: {
          year: { $year: '$date' },
          month: { $month: '$date' }
        },
        totalNombre: { $sum: '$produits.nombre' },
        totalRevenue: { $sum: '$produits.prixTotal' }
      }
    },
    { $sort: { '_id.month': 1 } }
  ]);
  
  return result;
};

module.exports = {
  countOrdersByEtatAndBoutique,
  sumPrixTotalByEtatAndBoutique,
  sumPrixTotalCurrentMonthByEtatAndBoutique,
  getBestProductByBoutique,
  getAllProductsSalesByBoutique,
  getSalesByMonthByBoutique
};
