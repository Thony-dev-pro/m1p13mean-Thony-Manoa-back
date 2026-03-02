const categorieService = require("../../services/categorie/categorieService");

const categorieController = {
  async getAllCategorieProduit(req, res) {
    try {
      const categories = await categorieService.getAllCategorieProduit();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getCategorieProduitById(req, res) {
    try {
      const categories = await categorieService.getCategorieProduitById(
        req.params.id,
      );

      if (!categories) {
        return res.status(404).json({ message: "categorie not found" });
      }

      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async createCategorieProduit(req, res) {
    try {
      const newCategorie = await categorieService.createCategorieProduit(
        req.body,
      );
      res.status(201).json(newCategorie);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async updateCategorieProduit(req, res) {
    try {
      const categories = await categorieService.updateCategorieProduit(
        req.params.id,
        req.body,
      );

      if (!categories) {
        return res.status(404).json({ message: "categorie not found" });
      }

      res.json(categories);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = categorieController;
