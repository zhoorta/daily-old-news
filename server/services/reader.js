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
  		

  		if(!page) page = 1;

		//Document.find({'$and': [{'$where': 'this.pub_date.slice(0, 10) == "' + date + '"'} , { print_page: page }]}).exec( function(err, docs) {
		//Document.find({ pub_date : date ,  print_page: page }).exec( function(err, docs) {
		//.sort({ print_page: 1 })

		//compose idx
		var tmpdate = new Date(date);

		if(tmpdate instanceof Date && !isNaN(tmpdate.valueOf())) {

			var year = tmpdate.getFullYear();
			var m = tmpdate.getMonth() + 1;
			var d = tmpdate.getDate();
			
			if(m<10) month = "0" + m.toString();
			else month = m.toString();

			if(d<10) day = "0" + d.toString();
			else day = d.toString();

			var idx = Number(year.toString() + month + day);

			console.log('start reading ' + idx);


			Publication.findOne({ "id" : idx  }).exec( function(err, pub) {
			
				console.log('returning results!')
				if (err) throw err;			

		    	db.close();
		    	mongoose.disconnect();

		    	if(pub)	
		  		{
		  			//compose array
		  			//var obj = {print_page: Number, articles: Array}
					var ret_arr = Array();
					var idx = 0;

					for (var i = 0; i < pub.articles.length; i++) {

						if(isNaN(pub.articles[i].print_page)) idx = 9999;
						else idx = Number(pub.articles[i].print_page);

						if(!ret_arr[idx]) 
							{
								ret_arr[idx] = new Object;
								ret_arr[idx].print_page = idx;
								ret_arr[idx].articles = new Array;
							}

						ret_arr[idx].articles.push(pub.articles[i]);

					};

					/*
		  			pub.articles.sort(function(a, b){ 
		  				var xa = 9999;
		  				var xb = 9999;

						if(!isNaN(a.print_page)) xa=parseInt(a.print_page);
						if(!isNaN(b.print_page)) xb=parseInt(b.print_page);

						console.log(xa)
						console.log(xb)
						return xa-xb
						}
					);
					*/
					ret_arr.shift();
		    		//res.status(200).json(pub.articles);
		    		res.status(200).json(ret_arr);
		    	}
		    	else res.status(200).json([]);

			});

		}
		else 
		{
			db.close();
		    mongoose.disconnect();
			res.status(200).json([]);
		}
	});

};


