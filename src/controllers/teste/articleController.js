const Article = require('../../models/Article');
const articleService = require('../../services/teste/articleService');

const articleController = {
  // GET ALL
  async getAllArticles(req, res) {
    try {
      const articles = await articleService.getAll();
      res.json(articles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // GET BY ID
  async getArticleById(req, res) {
    try {
      const article = await articleService.getById(req.params.id);

      if (!article) {
        return res.status(404).json({ message: 'Article not found' });
      }

      res.json(article);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // CREATE
  async createArticle(req, res) {
    try {
      const newArticle = await articleService.create(req.body);
      res.status(201).json(newArticle);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // UPDATE
  async updateArticle(req, res) {
    try {
      const updatedArticle = await articleService.update(
        req.params.id,
        req.body
      );

      if (!updatedArticle) {
        return res.status(404).json({ message: 'Article not found' });
      }

      res.json(updatedArticle);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // DELETE
  async deleteArticle(req, res) {
    try {
      const deleted = await articleService.delete(req.params.id);

      if (!deleted) {
        return res.status(404).json({ message: 'Article not found' });
      }

      res.json({ message: 'Article deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  /*getAllArticles: async (req, res) => {
    try {
      const articles = await Article.find();
      res.json(articles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }*/
};

module.exports = articleController;