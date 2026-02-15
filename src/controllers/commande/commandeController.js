const commandeService = require('../../services/commande.service');

const commandeController = {
  createCommande: async (req, res) => {
    try {
      const { produits, lieu } = req.body;
      const utilisateurId = req.user.userId
      const result = await commandeService.createInitialCommande(produits, utilisateurId, lieu);
      res.status(201).json(result);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  },

  validateCommande: async (req, res) => {
    try {
      const { commandeId } = req.params;
      const result = await commandeService.validateCommande(commandeId);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  cancelCommande: async (req, res) => {
    try {
      const { commandeId } = req.params;
      const result = await commandeService.canceledCommande(commandeId);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getAllCommandes: async (req, res) => {
    try {
      const result = await commandeService.getAllCommandes();
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = commandeController;