const { ETAT } = require("../../constant/utilisateur");
const Boutique = require("../../models/Utilisateur");

const boutiqueService = {
  // GET ALL
  async getAllBoutique() {
    return await Boutique.find();
  },

  async getBoutique() {
    return await Boutique.find({ type: 2 });
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
  async desactiverCompteBoutique(userId) {
   try {
       const updatedUser = await Utilisateur.findByIdAndUpdate(
         userId,
         { etat: ETAT.BLOQUER },
         { new: true }
       );
       return updatedUser;
     } catch (error) {
       throw error;
     }
  },
};

module.exports = boutiqueService;
