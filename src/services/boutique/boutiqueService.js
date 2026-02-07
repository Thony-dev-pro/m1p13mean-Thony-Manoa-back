const Boutique = require("../../models/Utilisateur");

const boutiqueService = {
  // GET ALL
  async getAllBoutique() {
    return await Boutique.find();
  },

  // GET BY ID
  async getBoutiqueById(id) {
    return await Boutique.findById(id);
  },

  // CREATE
  async createBoutique(boutiqueData) {
    if (Array.isArray(boutiqueData)) {
      // insertMany pour plusieurs documents
      return await Boutique.insertMany(boutiqueData);
    } else {
      // un seul document
      const boutique = new Boutique(boutiqueData);
      return await boutique.save();
    }
  },

  // UPDATE
  async updateBoutiqueInfo(id, boutiqueData) {
    return await Boutique.findByIdAndUpdate(
      id,
      boutiqueData,
      { new: true, runValidators: true }, // retourne la version mise à jour
    );
  },

  // DELETE
  async desactiverCompteBoutique(id) {
    return await Boutique.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true },
    );
  },
};

module.exports = boutiqueService;
