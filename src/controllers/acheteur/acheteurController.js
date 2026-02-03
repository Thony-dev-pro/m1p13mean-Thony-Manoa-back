const acheteurService = require('../../services/acheteur.service');
const jwt = require('jsonwebtoken');

const acheteurController = {
  getAcheteur: (req, res) => {
    res.json({ message: 'Acheteur controller working' });
  },
  
  register: async (req, res) => {
    try {
      const result = await acheteurService.registration(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { mail, mdp } = req.body;
      const user = await acheteurService.login(mail, mdp);
      
      const token = jwt.sign(
        { userId: user._id, type: user.type },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );
      
      res.json({ user, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = acheteurController;