const boutiqueService = require("../../services/boutique/boutiqueService");

const boutiqueController = {
  // GET ALL
  async getAllBoutique(req, res) {
    try {
      const boutiques = await boutiqueService.getAllBoutique();
      res.json(boutiques);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  // CREATE
  async createBoutique(req, res) {
    try {
      const newBoutique = await boutiqueService.createBoutique(req.body);
      res.status(201).json(newBoutique);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  
};

module.exports = boutiqueController;
