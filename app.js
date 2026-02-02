const express = require('express');
const app = express();
const PORT = 3000;

// Import routes
const acheteurRoutes = require('./src/routes/acheteur');
const adminRoutes = require('./src/routes/admin');
const boutiqueRoutes = require('./src/routes/boutique');

app.use(express.json());

// Mount routes
app.use('/acheteur', acheteurRoutes);
app.use('/admin', adminRoutes);
app.use('/boutique', boutiqueRoutes);

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});