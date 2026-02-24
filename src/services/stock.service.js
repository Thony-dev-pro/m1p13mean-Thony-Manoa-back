const mongoose = require('mongoose');
const Stock = require('../models/Stock');
const Produit = require('../models/Produit');
const { ETAT } = require('../constant/stock');

const insertStock = async (stockData) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const produit = await Produit.findById(stockData.produit).session(session);
    
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

    const [insertedStock] = await Promise.all([
      Stock.insertMany(stockEntries, { session }),
      Produit.findByIdAndUpdate(
        stockData.produit,
        { $inc: { nombre: stockData.nombre } },
        { session, new: true }
      )
    ]);

    await session.commitTransaction();
    return insertedStock[0];
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

module.exports = {
  insertStock
};
