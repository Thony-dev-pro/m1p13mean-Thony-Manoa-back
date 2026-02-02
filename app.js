const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const PORT = 3000;

// Import routes
const acheteurRoutes = require('./src/routes/acheteur');
const adminRoutes = require('./src/routes/admin');
const boutiqueRoutes = require('./src/routes/boutique');
const articleRoutes = require('./src/routes/teste/articles');

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose. connect(process.env.MONGO_URI).then(() => console.log("MongoDB connecté"))
 .catch(err => console.log(err));

// Mount routes
app.use('/acheteur', acheteurRoutes);
app.use('/admin', adminRoutes);
app.use('/boutique', boutiqueRoutes);
app.use('/articles', articleRoutes);

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});