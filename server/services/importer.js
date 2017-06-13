exports.import_nyt_json = function(res, year, month) {

	// declare axios for making http requests
	const axios = require('axios');
	const API = 'http://api.nytimes.com/svc/archive/v1';
	const APIKey = '';


	var mongoose = require('mongoose');
	mongoose.Promise = global.Promise;

	mongoose.connect('mongodb://localhost/nyt/docs');
	var db = mongoose.connection;


	var Document = require('../models/document');
	var DocumentOld = require('../models/documentold');
	

	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function() {


		DocumentOld.find({ pub_date : '1968-01-01' }).sort({ print_page: 1 }).stream()
			.on('data', function(doc){
				
				/*
				//compose idx
				var tmpdate = new Date(doc.pub_date);
				var year = tmpdate.getFullYear();
				var m = tmpdate.getMonth() + 1;
				var d = tmpdate.getDay();
				
				if(m<10) month = "0" + m.toString();
				else month = m.toString();

				if(d<10) day = "0" + d.toString();
				else day = d.toString();

				var idx = Number(year.toString() + month + day);

				console.log("--------"); 
				console.log(idx); 

				// handle doc
				Document.update({ id: idx }, { $push: { articles: doc }}, function(err, doc) {

					if (err) { 
						console.log(err); 
						throw err; 
					}
					else console.log(doc); 
			
				});
				
			})
			.on('error', function(err){
				// handle error
				console.log(err); 
			})
			.on('end', function(){
				// final callback
				console.log('finished'); 
			});
			*/
			



		
		for(var y = 1851 ; y<2003; y++)
			for(var m=1; m<13; m++) 
				for(var d=1; d<31; d++) 
			{

				//compose idx
				if(m<10) month = "0" + m.toString();
				else month = m.toString();

				if(d<10) day = "0" + d.toString();
				else day = d.toString();

				var idx = Number(y.toString() + month + day);

				
				var mongo_doc = new Document(
					{
					id: idx
					});

    			mongo_doc.save(function(err) {
					if (err) { 
						console.log(err); 
						throw err; 
						exit();
						}
				});
				
				console.log(idx);

			}
		
			

		/*
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
    					pub_date: articles[article].pub_date.substr(0,10),
    					web_url: articles[article].web_url,
    					print_page: articles[article].print_page,
    					keywords: articles[article].keywords,
    				});

    			mongo_doc.save(function(err) {
					if (err) { 
						console.log(err); 
						throw err; 
						}
				});
    			
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


    		*/
  			
	    })
	    .catch(error => {
	    	db.close();
	    	console.log(error);
	      	res.status(500).send(error)
	    });


	};





