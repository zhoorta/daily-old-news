exports.get_nyt_articles = function(res, date, page) {

	const mongoose = require('mongoose');
 
	const axios = require('axios');
	const API = 'http://don.ironsoft.net/api/docs';
	
	mongoose.connect('mongodb://localhost/don');
	mongoose.Promise = global.Promise;	

	var db = mongoose.connection;

	var Publication = require('../models/publication');

	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function() {

		// we're connected!
  		console.log('-----------------');
  		console.log('we\'re connected!');
  		console.log('start reading ' + date);

  		if(!page) page = 1;

		//Document.find({'$and': [{'$where': 'this.pub_date.slice(0, 10) == "' + date + '"'} , { print_page: page }]}).exec( function(err, docs) {
		//Document.find({ pub_date : date ,  print_page: page }).exec( function(err, docs) {
		//.sort({ print_page: 1 })


		//compose idx
		var tmpdate = new Date(date);
		var year = tmpdate.getFullYear();
		var m = tmpdate.getMonth() + 1;
		var d = tmpdate.getDay();
		
		if(m<10) month = "0" + m.toString();
		else month = m.toString();

		if(d<10) day = "0" + d.toString();
		else day = d.toString();

		var idx = Number(year.toString() + month + day);


		Publication.findOne({ "id" : idx  }).exec( function(err, pub) {
		
			console.log('returning results!')
			if (err) throw err;

	    	db.close();
	    	mongoose.disconnect();

	    	if(pub)	res.status(200).json(pub.articles);
	    	else res.status(200).json([]);

		});

	});

};


