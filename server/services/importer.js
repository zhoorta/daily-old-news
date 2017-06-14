exports.import_nyt_json = function(res, year, month) {

	// declare axios for making http requests
	const axios = require('axios');
	const API = 'http://api.nytimes.com/svc/archive/v1';
	const APIKey = '';


	var mongoose = require('mongoose');
	mongoose.Promise = global.Promise;

	mongoose.connect('mongodb://localhost/don');
	var db = mongoose.connection;


	var Publication = require('../models/publication');
	

	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function() {
			
  		// we're connected!
  		console.log('-----------------');
  		console.log('we\'re connected!');
  		
  		// starting import
  		console.log('starting import!');
  		console.log(`${API}/` + year + '/' + month + '.json?api-key=' + APIKey);
		

		axios.get(`${API}/` + year + '/' + month + '.json?api-key=' + APIKey)
		//axios.get('http://localhost:3000/assets/data.json')
	    .then(content => {

	    	var nyt_articles = content.data.response.docs;

	    	//sort by date and page
	    	/*
	    	nyt_articles.sort(function(a, b) {
			    return (b.pub_date.substr(0,10) < a.pub_date.substr(0,10) || parseInt(b.print_page) - parseFloat(a.print_page));
			});
			*/

			//compose array
			var pubs = [];
			var idx;

			for (var i = 0; i < nyt_articles.length; i++) {

				idx = Number(nyt_articles[i].pub_date.substr(0,10).replace('-', '').replace('-', ''));

				if(!pubs[idx]) pubs[idx] = new Array();

				pubs[idx].push(nyt_articles[i]);

			};

			for (var key in pubs) {

			  console.log("key " + key);			 
			  Publication.create({id: key, articles: pubs[key]});
			}

   			   		
    		
    		console.log('finished import!');
    		console.log('waiting 5sec');
    		setTimeout( ( function timeOut() { 

    			console.log('waited 5sec');
    			console.log('-----------------');
  		
				db.close();
	    		mongoose.disconnect();

	    		res.status(200).json({ok:"ok"});
    		
    		}), 5000);

  			
	    })
	    .catch(error => {
	    	db.close();
	    	console.log(error);
	      	res.status(500).send(error)
	    });


	});

}