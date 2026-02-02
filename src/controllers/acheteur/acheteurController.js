const acheteurService = require('../../services/acheteur.service');

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
  }
};

module.exports = acheteurController;