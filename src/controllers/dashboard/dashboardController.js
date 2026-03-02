const dashboardService = require('../../services/dashboard.boutique.service');
const dashboardAdminService = require('../../services/dashboard.service');
const { ETAT } = require('../../constant/commande');

const dashboardController = {
  dashboardBoutique: async (req, res) => {
    try {
      const boutiqueId = req.user.userId;
      const { startDate, endDate } = req.query;

      const [payer, aValider, totalPayer, totalPayerCurrentMonth, bestProduct, allProductsSales, salesByMonth] = await Promise.all([
        dashboardService.countOrdersByEtatAndBoutique(ETAT.PAYER, boutiqueId, startDate, endDate),
        dashboardService.countOrdersByEtatAndBoutique(ETAT.A_VALIDER, boutiqueId, startDate, endDate),
        dashboardService.sumPrixTotalByEtatAndBoutique(ETAT.PAYER, boutiqueId),
        dashboardService.sumPrixTotalCurrentMonthByEtatAndBoutique(ETAT.PAYER, boutiqueId),
        dashboardService.getBestProductByBoutique(boutiqueId),
        dashboardService.getAllProductsSalesByBoutique(boutiqueId),
        dashboardService.getSalesByMonthByBoutique(boutiqueId)
      ]);
      res.json({
        payer,
        aValider,
        totalPayer,
        totalPayerCurrentMonth,
        bestProduct,
        allProductsSales,
        salesByMonth
      });
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: error.message });
    }
  },

  dashboardAdmin: async (req, res) => {
    try {
      const { dateDebut, dateFin } = req.query;
      const stats = await dashboardAdminService.getDashboardStats(dateDebut, dateFin);
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = dashboardController;
