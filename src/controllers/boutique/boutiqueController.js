const boutiqueService = require('../../services/boutique.service');
const jwt = require('jsonwebtoken');
const produitService = require('../../services/produit/produitService');

const boutiqueServiceCr = require("../../services/boutique/boutiqueService");

const boutiqueController = {
  getBoutique: (req, res) => {
    res.json({ message: 'Boutique controller working' });
  },

  register: async (req, res) => {
    try {
      const result = await boutiqueService.registration(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  validate: async (req, res) => {
    try {
      const { userId } = req.params;
      const result = await boutiqueService.validateBoutique(userId);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { mail, mdp } = req.body;
      const user = await boutiqueService.login(mail, mdp);

      const token = jwt.sign(
        { userId: user._id, type: user.type },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN_BOUTIQUE }
      );

      res.json({ user, token });
    } catch (error) {
      console.log(error)
      res.status(400).json({ error: error.message });
    }
  },
  // GET ALL
  async getAllBoutique(req, res) {
    try {
      const boutiques = await boutiqueServiceCr.getAllBoutique();
      res.json(boutiques);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  // CREATE
  async createBoutique(req, res) {
    try {
      const newBoutique = await boutiqueServiceCr.createBoutique(req.body);
      res.status(201).json(newBoutique);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async modifierInfoBoutique(req, res) {
    try {
      const boutiques = await boutiqueServiceCr.updateBoutiqueInfo(
        req.params.id,
        req.body,
      );

      if (!boutiques) {
        return res.status(404).json({ message: "boutique not found" });
      }

      res.json(boutiques);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async desactiverCompteBoutique(req, res) {
    try {
      const boutique = await boutiqueServiceCr.desactiverCompteBoutique(req.params.id);
      res.status(201).json(boutique);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getMesProduits(req, res) {
    try {
      if (!req.user || !req.user.userId) {
        return res.status(401).json({ error: 'Authentification requise' });
      }
      const produits = await produitService.getProduitByBoutiqueId(req.user.userId);
      res.json(produits);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

};

module.exports = boutiqueController;