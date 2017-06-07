exports.import_nyt_json = function(res, year, month) {

	// declare axios for making http requests
	const axios = require('axios');
	//const API = 'http://ironsoft.net';
	const API = 'http://localhost:3000';


	var mongoose = require('mongoose');
	mongoose.Promise = global.Promise;


	var Document = require('../models/document');

	var db = mongoose.createConnection('mongodb://localhost/nyt/docs');


	db.on('error', console.error.bind(console, 'connection error:'));
	//db.on('close', function() { console.log('closed') });
	db.once('open', function() {
  		// we're connected!
  		console.log('-----------------');
  		console.log('we\'re connected!');
  		
  		// starting import
  		console.log('starting import!');
  		console.log(`${API}/` + year + month + '.json');
		

		axios.get(`${API}/` + year + month + '.json')
	    .then(content => {
	    	
	    	var articles = content.data.response.docs;
	    	for(article in articles) {

    			var mongo_doc = new Document(
    				{
    					type_of_material: articles[article].type_of_material,
    					headline: articles[article].headline.main,
    					lead_paragraph: articles[article].lead_paragraph,
    					pub_date: articles[article].pub_date,
    					web_url: articles[article].web_url,
    				});

    			mongo_doc.save(function(err) {

					if (err) { console.log(err); throw err;}
				});
    			
    			//console.log('inserted '+ article);
    		}

    		console.log('finished import!');
  			console.log('-----------------');
  		

	    	db.close();

	    	res.status(200).json(articles);
	    })
	    .catch(error => {
	    	console.log(error);
	      res.status(500).send(error)
	    });


	});



};


