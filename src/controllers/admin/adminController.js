const adminService = require('../../services/admin.service');

const adminController = {
  getAdmin: (req, res) => {
    res.json({ message: 'Admin controller working' });
  },
  
  register: async (req, res) => {
    try {
      const result = await adminService.registration(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = adminController;