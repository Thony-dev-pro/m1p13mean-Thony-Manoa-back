const Article = require('../../models/Article');

const articleService = {
    // GET ALL
  async getAll() {
    return await Article.find();
  },

  // GET BY ID
  async getById(id) {
    return await Article.findById(id);
  },

  // CREATE
  async create(articleData) {
    const article = new Article(articleData);
    return await article.save();
  },

  // UPDATE
  async update(id, articleData) {
    return await Article.findByIdAndUpdate(
      id,
      articleData,
      { new: true } // retourne la version mise à jour
    );
  },

  // DELETE
  async delete(id) {
    return await Article.findByIdAndDelete(id);
  }
};

module.exports = articleService;