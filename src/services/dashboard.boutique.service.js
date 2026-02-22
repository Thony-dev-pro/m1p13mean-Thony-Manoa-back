const Commande = require('../models/Commande');
const { ETAT } = require('../constant/commande');

const countOrdersByEtatAndBoutique = async (etat, boutiqueId) => {
  return await Commande.countDocuments({ 
    etat,
    'produits.boutique': boutiqueId 
  });
};

const sumPrixTotalByEtatAndBoutique = async (etat, boutiqueId) => {
  const result = await Commande.aggregate([
    {
      $match: {
        etat,
        'produits.boutique': boutiqueId
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
        'produits.boutique': boutiqueId,
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
  const Stock = require('../models/Stock');
  const mongoose = require('mongoose');
  const { ETAT: ETAT_STOCK } = require('../constant/stock');
  
  const result = await Stock.aggregate([
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
      $match: {
        'produitInfo.boutique': new mongoose.Types.ObjectId(boutiqueId),
        etat: ETAT_STOCK.VENTE
      }
    },
    {
      $group: {
        _id: '$produit',
        totalNombre: { $sum: '$nombre' },
        totalRevenue: { $sum: { $multiply: ['$nombre', '$prix'] } },
        produitInfo: { $first: '$produitInfo' }
      }
    },
    { $sort: { totalNombre: -1 } },
    { $limit: 1 }
  ]);
  
  return result.length > 0 ? result[0] : null;
};

const getAllProductsSalesByBoutique = async (boutiqueId) => {
  const Stock = require('../models/Stock');
  const mongoose = require('mongoose');
  const { ETAT: ETAT_STOCK } = require('../constant/stock');
  
  const result = await Stock.aggregate([
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
      $match: {
        'produitInfo.boutique': new mongoose.Types.ObjectId(boutiqueId),
        etat: ETAT_STOCK.VENTE
      }
    },
    {
      $group: {
        _id: '$produit',
        totalNombre: { $sum: '$nombre' },
        totalRevenue: { $sum: { $multiply: ['$nombre', '$prix'] } },
        produitInfo: { $first: '$produitInfo' }
      }
    },
    { $sort: { totalNombre: -1 } }
  ]);
  
  return result;
};

const getSalesByMonthByBoutique = async (boutiqueId) => {
  const Stock = require('../models/Stock');
  const mongoose = require('mongoose');
  const { ETAT: ETAT_STOCK } = require('../constant/stock');
  
  const currentYear = new Date().getFullYear();
  const startOfYear = new Date(currentYear, 0, 1);
  const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59, 999);
  
  const result = await Stock.aggregate([
    {
      $match: {
        etat: ETAT_STOCK.VENTE,
        date: { $gte: startOfYear, $lte: endOfYear }
      }
    },
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
      $match: {
        'produitInfo.boutique': new mongoose.Types.ObjectId(boutiqueId)
      }
    },
    {
      $group: {
        _id: {
          year: { $year: '$date' },
          month: { $month: '$date' }
        },
        totalNombre: { $sum: '$nombre' },
        totalRevenue: { $sum: { $multiply: ['$nombre', '$prix'] } }
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
