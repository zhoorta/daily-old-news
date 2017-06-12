const express = require('express');
const router = express.Router();

// Import data
router.get('/import/:year/:month', (req, res) => {
	
	var importer = require('../services/importer');

	importer.import_nyt_json(res, req.params.year, req.params.month);

});

// Get documents
router.get('/docs/:year/:month/:day/:page?', (req, res) => {

	var reader = require('../services/reader');

	if(req.params.month.length < 2) req.params.month = "0" + req.params.month;
	if(req.params.day.length < 2) req.params.day = "0" + req.params.day;
	
	reader.get_nyt_articles(res, req.params.year + '-' + req.params.month + '-' + req.params.day, req.params.page);

});


module.exports = router;