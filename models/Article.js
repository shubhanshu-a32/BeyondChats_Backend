const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: String,
    content: String,
    url: String,
    isUpdated: { type: Boolean, default: false },
    references: { type: [String], default: [] },
}, {timestamps: true});

module.exports = mongoose.model("Article", articleSchema);