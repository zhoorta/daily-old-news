exports.import_nyt_json = function(res, year, month) {

	// declare axios for making http requests
	const axios = require('axios');
	const API = 'http://api.nytimes.com/svc/archive/v1';
	const APIKey = '';


	var mongoose = require('mongoose');
	mongoose.Promise = global.Promise;

	var db = mongoose.createConnection('mongodb://localhost/nyt/docs');


	var Document = require('../models/document');
	

	db.on('error', console.error.bind(console, 'connection error:'));
	//db.on('close', function() { console.log('closed') });
	db.once('open', function() {
  		// we're connected!
  		console.log('-----------------');
  		console.log('we\'re connected!');
  		
  		// starting import
  		console.log('starting import!');
  		console.log(`${API}/` + year + '/' + month + '.json?api-key=' + APIKey);
		

		axios.get(`${API}/` + year + '/' + month + '.json?api-key=' + APIKey)
	    .then(content => {

	    	
	    	
	    	var articles = content.data.response.docs;
	    	for(article in articles) {

	    		
	    		if(isNaN(articles[article].print_page)) articles[article].print_page = 99999;

    			var mongo_doc = new Document(
    				{
    					type_of_material: articles[article].type_of_material,
    					headline: articles[article].headline.main,
    					lead_paragraph: articles[article].lead_paragraph,
    					pub_date: articles[article].pub_date,
    					web_url: articles[article].web_url,
    					print_page: articles[article].print_page,
    				});

    			mongo_doc.save(function(err) {
					if (err) { 
						console.log(err); 
						throw err; 
						}
				});
    			
    		}

    		console.log('finished import!');
  			console.log('-----------------');
  		

	    	db.close();

	    	res.status(200).json({ok:"ok"});
	    })
	    .catch(error => {
	    	db.close();
	    	console.log(error);
	      	res.status(500).send(error)
	    });


	});



};


