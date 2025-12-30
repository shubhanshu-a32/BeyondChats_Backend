const Article = require('../models/Article');

exports.getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find();
        res.json(articles);
    } catch (error) {
        res.status(500).json({ message: "Error fetching articles", error: error.message });
    }
};

exports.createArticle = async (req, res) => {
    try {
        const article = await Article.create(req.body);
        res.status(201).json(article);
    } catch (error) {
        res.status(400).json({ message: "Error creating article", error: error.message });
    }
};

exports.updateArticle = async (req, res) => {
    try {
        const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!article) return res.status(404).json({ message: "Article not found" });
        res.json(article);
    } catch (error) {
        res.status(500).json({ message: "Error updating article", error: error.message });
    }
};

exports.deleteArticle = async (req, res) => {
    try {
        const article = await Article.findByIdAndDelete(req.params.id);
        if (!article) return res.status(404).json({ message: "Article not found" });
        res.json({ success: true, message: "Article deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting article", error: error.message });
    }
};
