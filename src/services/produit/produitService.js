const Produit = require("../../models/Produit");

const getAllProduit = async () => {
  return await Produit.find().populate('categorie');
};

const getProduitById = async (id) => {
  return await Produit.findById(id);
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


const deleteProduit = async (id) => {
  return await Produit.findByIdAndDelete(id);
};

module.exports = {
  getAllProduit,
  getProduitById,
  createProduit,
  updateProduit,
  deleteProduit
};
