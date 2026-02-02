const adminController = {
  getAdmin: (req, res) => {
    res.json({ message: 'Admin controller working' });
  }
};

module.exports = adminController;