const adminService = require('../../services/admin.service');
const acheteurService = require('../../services/acheteur.service');
const jwt = require('jsonwebtoken');

const adminController = {
  getAdmin: (req, res) => {
    res.json({ message: 'Admin controller working' });
  },
  
  register: async (req, res) => {
    try {
      const result = await adminService.registration(req.body);
      res.status(201).json(result);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { mail, mdp } = req.body;
      const user = await adminService.login(mail, mdp);
      
      const token = jwt.sign(
        { userId: user._id, type: user.type },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );
      
      res.json({ user, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  getListeAcheteur: async (req, res) => {
    try {
      console.log(req.user);

      if (!req.user || !req.user.userId) {
        return res.status(401).json({ error: "Authentification requise" });
      }
      
      const acheteurs = await acheteurService.getListAcheteurs();
      res.json(acheteurs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = adminController;