const boutiqueService = require('../../services/boutique.service');
const jwt = require('jsonwebtoken');

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
  }
};

module.exports = boutiqueController;