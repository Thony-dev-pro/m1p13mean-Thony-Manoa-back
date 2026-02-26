const stockService = require("../../services/stock.service");

const stockController = {
    ajoutStock : async (req, res) => {
        try {
            console.log(req.user);

            if (!req.user || !req.user.userId) {
                return res.status(401).json({ error: "Authentification requise" });
            }

            const userId = req.user.userId;
            const stockData = req.body;
            const stock = await stockService.insertStock(stockData);
            res.status(201).json(stock);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    getMouvementStock: async (req, res) => {
        try {
            if (!req.user || !req.user.userId) {
                return res.status(401).json({ error: "Authentification requise" });
            }

            const boutiqueId = req.user.userId;
            const mouvements = await stockService.getStockByBoutique(boutiqueId);
            res.json(mouvements);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
module.exports = stockController;