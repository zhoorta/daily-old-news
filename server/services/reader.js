exports.get_nyt_articles = function(res, date, page) {

	const mongoose = require('mongoose');
 
	const axios = require('axios');
	const API = 'http://localhost:3000/api/docs';

	mongoose.Promise = global.Promise;	
	
	//var db = mongoose.createConnection('mongodb://localhost/nyt/docs');
	mongoose.connect('mongodb://localhost/nyt/docs');
	var db = mongoose.connection;

	var Document = require('../models/document');

	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function() {

		// we're connected!
  		console.log('-----------------');
  		console.log('we\'re connected!');
  		console.log('start reading ' + date);

  		if(!page) page = 1;

		Document.find({'$and': [{'$where': 'this.pub_date.slice(0, 10) == "' + date + '"'} , { print_page: page }]}).exec( function(err, docs) {
		
			console.log('returning results!')
			if (err) throw err;

	    	db.close();
	    	mongoose.disconnect();

			res.status(200).json(docs);

		});

	});

};


