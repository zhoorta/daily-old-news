const express = require('express');
const router = express.Router();

// Import data
router.get('/import/:year/:month', (req, res) => {
	
	var importer = require('../services/importer');

	importer.import_nyt_json(res, req.params.year, req.params.month);

});

// Get documents
router.get('/docs/:year/:month/:day', (req, res) => {

	var reader = require('../services/reader');
	
	reader.get_nyt_articles(res, req.params.year + '-' + req.params.month + '-' + req.params.day);

});


module.exports = router;