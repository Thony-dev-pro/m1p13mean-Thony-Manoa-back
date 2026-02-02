const boutiqueService = require('../../services/boutique.service');

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
  }
};

module.exports = boutiqueController;