const Article = require('../../models/Article');

const articleController = {
  getAllArticles: async (req, res) => {
    try {
      const articles = await Article.find();
      res.json(articles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = articleController;