const Stock = require('../models/Stock');
const Produit = require('../models/Produit');
const { ETAT } = require('../constant/stock');

const insertStock = async (stockData) => {
  const produit = await Produit.findById(stockData.produit);
  
  if (!produit) {
    throw new Error('Produit non trouvé');
  }

  const stockEntries = [{
    produit: stockData.produit,
    prix: stockData.prix,
    nombre: stockData.nombre,
    etat: ETAT.AJOUT,
    date: new Date()
  }];

  const updateData = { $inc: { nombre: stockData.nombre } };
  
  if (stockData.prix) {
    updateData.prix = stockData.prix;
  }

  const [insertedStock] = await Promise.all([
    Stock.insertMany(stockEntries),
    Produit.findByIdAndUpdate(
      stockData.produit,
      updateData,
      { new: true }
    )
  ]);

  return insertedStock[0];
};

const getStockByBoutique = async (boutiqueId) => {
  const produits = await Produit.find({ boutique: boutiqueId }).select('_id');
  
  const produitIds = produits.map(p => p._id);
  
  return await Stock.find({ produit: { $in: produitIds } })
    .populate('produit', 'nomProduit prix image')
    .sort({ date: -1 });
};

module.exports = {
  insertStock,
  getStockByBoutique
};
