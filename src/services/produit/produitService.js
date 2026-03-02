const Produit = require("../../models/Produit");
const Stock = require("../../models/Stock");
const { ETAT } = require("../../constant/stock");

const getAllProduit = async () => {
  return await Produit.find().populate('categorie').populate('boutique');
};

const getProduitById = async (id) => {
  return await Produit.findById(id).populate('categorie').populate('boutique');
};

const createProduit = async (produitData) => {
  if (Array.isArray(produitData)) {
    const produits = await Produit.insertMany(produitData);
    
    const stockEntries = produits.map(p => ({
      produit: p._id,
      prix: p.prix,
      nombre: p.nombre,
      etat: ETAT.AJOUT,
      date: new Date()
    }));
    
    await Stock.insertMany(stockEntries);
    return produits;
  } else {
    const produit = new Produit(produitData);
    const savedProduit = await produit.save();
    
    await Stock.create({
      produit: savedProduit._id,
      prix: savedProduit.prix,
      nombre: savedProduit.nombre,
      etat: ETAT.AJOUT,
      date: new Date()
    });
    
    return savedProduit;
  }
};

const updateProduit = async (produitId, userId, produitData) => {
  return await Produit.findOneAndUpdate(
    {
      _id: produitId,
      boutique: userId // 🔥 sécurité
    },
    produitData,
    {
      new: true,
      runValidators: true
    }
  );
};

const decrementProduitStock = async (updates) => {
  const bulkOps = updates.map(update => ({
    updateOne: {
      filter: { _id: update.id },
      update: { $inc: { nombre: -update.value } }
    }
  }));
  return await Produit.bulkWrite(bulkOps);
};


const deleteProduit = async (id) => {
  return await Produit.findByIdAndDelete(id);
};

const getProduitByBoutiqueId = async (boutiqueId) => {
  return await Produit.find({ boutique: boutiqueId }).populate('categorie').populate('boutique');
};

const getProduitByCategorie = async (categorieId) => {
  return await Produit.find({ categorie: categorieId, nombre: { $gt: 0 } }).populate('categorie').populate('boutique');
};

const getAvailableProduits = async () => {
  return await Produit.find({ nombre: { $gt: 0 } }).populate('categorie').populate('boutique');
};

const searchProduits = async (searchTerm, categorieId) => {
  const regex = new RegExp(searchTerm, 'i');
  
  const filter = {
    $or: [
      { nomProduit: regex },
      { prix: !isNaN(searchTerm) ? Number(searchTerm) : null }
    ]
  };
  
  if (categorieId) {
    filter.categorie = categorieId;
  }
  
  return await Produit.find(filter)
    .populate('categorie')
    .populate('boutique');
};

module.exports = {
  getAllProduit,
  getProduitById,
  createProduit,
  updateProduit,
  decrementProduitStock,
  deleteProduit,
  getProduitByBoutiqueId,
  getProduitByCategorie,
  getAvailableProduits,
  searchProduits
};
