const Produit = require("../../models/Produit");

const getAllProduit = async () => {
  return await Produit.find().populate('categorie').populate('boutique');
};

const getProduitById = async (id) => {
  return await Produit.findById(id).populate('categorie').populate('boutique');
};

const createProduit = async (produitData) => {
  if (Array.isArray(produitData)) {
    return await Produit.insertMany(produitData);
  } else {
    const produit = new Produit(produitData);
    return await produit.save();
  }
};

const updateProduit = async (produitId, userId, produitData) => {
  return await Produit.findOneAndUpdate(
    {
      _id: produitId,
      boutique: userId // 🔥 sécurité
    },
    produitData,
    {
      new: true,
      runValidators: true
    }
  );
};

const decrementProduitStock = async (updates) => {
  const bulkOps = updates.map(update => ({
    updateOne: {
      filter: { _id: update.id },
      update: { $inc: { nombre: -update.value } }
    }
  }));
  return await Produit.bulkWrite(bulkOps);
};


const deleteProduit = async (id) => {
  return await Produit.findByIdAndDelete(id);
};

const getProduitByBoutiqueId = async (boutiqueId) => {
  return await Produit.find({ boutique: boutiqueId }).populate('categorie').populate('boutique');
};

const getProduitByCategorie = async (categorieId) => {
  return await Produit.find({ categorie: categorieId }).populate('categorie').populate('boutique');
};

const getAvailableProduits = async () => {
  return await Produit.find({ nombre: { $gt: 0 } }).populate('categorie').populate('boutique');
};

module.exports = {
  getAllProduit,
  getProduitById,
  createProduit,
  updateProduit,
  decrementProduitStock,
  deleteProduit,
  getProduitByBoutiqueId,
  getProduitByCategorie,
  getAvailableProduits
};
