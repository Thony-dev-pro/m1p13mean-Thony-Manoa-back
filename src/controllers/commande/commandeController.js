const commandeService = require('../../services/commande.service');

const commandeController = {
  createCommande: async (req, res) => {
    try {
      const { produits, lieu } = req.body;
      const utilisateurId = req.user.userId;
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
      const boutiqueId = req.user.userId;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const result = await commandeService.getAllCommandes(boutiqueId, page, limit);
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  },

  getCommandeById: async (req, res) => {
    try {
      const { commandeId } = req.params;
      const result = await commandeService.getCommandeById(commandeId);
      if (!result) {
        return res.status(404).json({ error: 'Commande non trouvée' });
      }
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = commandeController;