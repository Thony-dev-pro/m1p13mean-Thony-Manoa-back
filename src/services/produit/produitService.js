const Produit = require("../../models/Produit");

const produitService = {

  async getAllProduit() {
    return await Produit.find();
  },

  async getProduitById(id) {
    return await Produit.findById(id);
  },

  async createProduit(produitData) {
    if (Array.isArray(produitData)) {
      return await Produit.insertMany(produitData);
    } else {
      const produit = new Produit(produitData);
      return await produit.save();
    }
  },

  async updateProduit(id, produitData) {
    return await Produit.findByIdAndUpdate(
      id,
      produitData,
      { new: true, runValidators: true },
    );
  },

  async deleteProduit(id) {
    return await Produit.findByIdAndDelete(id);
  },
};

module.exports = produitService;
