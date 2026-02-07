const CategorieProduit = require("../../models/Categorie");

const categorieProduitService = {

  async getAllCategorieProduit() {
    return await CategorieProduit.find();
  },


  async getCategorieProduitById(id) {
    return await CategorieProduit.findById(id);
  },

  async createCategorieProduit(categorieData) {
    if (Array.isArray(categorieData)) {
      return await CategorieProduit.insertMany(categorieData);
    } else {
      const categorie = new CategorieProduit(categorieData);
      return await categorie.save();
    }
  },


  async updateCategorieProduit(id, categorieData) {
    return await CategorieProduit.findByIdAndUpdate(
      id,
      categorieData,
      { new: true }, 
    );
  },


  async deleteCategorieProduit(id) {
    return await CategorieProduit.findByIdAndDelete(id);
  },
};

module.exports = categorieProduitService;
