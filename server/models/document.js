const express = require('express');
const mongoose = require('mongoose');

var documentSchema = mongoose.Schema({
	_pub_date: Date,
    type_of_material: String,
    headline: String,
    lead_paragraph: String,
    pub_date: String,
    web_url: String,
    updated: { type: Date, default: Date.now },
});

var Document = mongoose.model('Docs', documentSchema);

module.exports = Document;