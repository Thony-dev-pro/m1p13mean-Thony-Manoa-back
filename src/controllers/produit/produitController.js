const produitService = require("../../services/produit/produitService");

const produitController = {
  getAllProduit: async (req, res) => {
    try {
      const produits = await produitService.getAllProduit();
      res.json(produits);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getProduitById: async (req, res) => {
    try {
      const produit = await produitService.getProduitById(req.params.id);

      if (!produit) {
        return res.status(404).json({ message: "produit not found" });
      }

      res.json(produit);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createProduit: async (req, res) => {
    try {
      console.log(req.user);

      if (!req.user || !req.user.userId) {
        return res.status(401).json({ error: "Authentification requise" });
      }

      const userId = req.user.userId;

      let produitData = req.body;

      if (req.file) {
        produitData.image = req.file.path;
      }

      if (Array.isArray(produitData)) {
        produitData = produitData.map((p) => ({
          ...p,
          boutique: userId,
        }));
      } else {
        produitData = { ...produitData, boutique: userId };
      }

      const result = await produitService.createProduit(produitData);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateProduit: async (req, res) => {
    try {
      console.log(req.user);

      if (!req.user || !req.user.userId) {
        return res.status(401).json({ error: "Authentification requise" });
      }

      const userId = req.user.userId;
      const produitData = req.body;

      if (req.file) {
        produitData.image = req.file.path;
      }

      const produit = await produitService.updateProduit(
        req.params.id,
        userId,
        produitData,
      );

      if (!produit) {
        return res.status(404).json({ message: "Produit introuvable ou accès interdit" });
      }

      res.json(produit);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteProduit: async (req, res) => {
    try {
      const produit = await produitService.deleteProduit(req.params.id);

      if (!produit) {
        return res.status(404).json({ message: "produit not found" });
      }

      res.json({ message: "produit deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = produitController;
