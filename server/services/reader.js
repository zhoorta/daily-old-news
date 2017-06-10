exports.get_nyt_articles = function(res, date, page) {

	// declare axios for making http requests
	const mongoose = require('mongoose');
 
	const axios = require('axios');
	const API = 'http://localhost:3000/api/docs';

	mongoose.Promise = global.Promise;

	
	mongoose.connect('mongodb://localhost/nyt/docs');

	var Document = require('../models/document');
	
	var db = mongoose.connection;
	//var db = mongoose.createConnection('mongodb://localhost/nyt/docs');

	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function() {

		// we're connected!
  		console.log('-----------------');
  		console.log('we\'re connected!');
  		
  		// starting import
  		console.log('start reading ' + date);

  		if(!page) page = 1;

		Document.find({'$and': [{'$where': 'this.pub_date.slice(0, 10) == "' + date + '"'} , { print_page: page }]}).exec( function(err, docs) {
		
			console.log('finished reading!')
			if (err) throw err;

			db.close();

			res.status(200).json(docs);

		});

	});

};


