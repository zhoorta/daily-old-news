const mongoose = require('mongoose');

var documentSchema = mongoose.Schema({
    type_of_material: String,
    headline: String,
    lead_paragraph: String,
    pub_date: Date,
    web_url: String,
    print_page: Number,
    updated: { type: Date, default: Date.now },
});

var Document = mongoose.model('Docs', documentSchema);

module.exports = Document;