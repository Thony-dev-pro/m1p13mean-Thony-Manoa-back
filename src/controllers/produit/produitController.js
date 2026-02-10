const produitService = require("../../services/produit/produitService");

const produitController = {
  async getAllProduit(req, res) {
    try {
      const produits = await produitService.getAllProduit();
      res.json(produits);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getProduitById(req, res) {
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

  async createProduit(req, res) {
    try {
      const newProduit = await produitService.createProduit(req.body);
      res.status(201).json(newProduit);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async updateProduit(req, res) {
    try {
      const produit = await produitService.updateProduit(
        req.params.id,
        req.body,
      );

      if (!produit) {
        return res.status(404).json({ message: "produit not found" });
      }

      res.json(produit);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async deleteProduit(req, res) {
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
