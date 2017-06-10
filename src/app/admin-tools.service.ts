import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { environment } from '../environments/environment';

@Injectable()
export class AdminToolsService {

    private apiUrl = environment.apiUrl;
    private apiKey = environment.apiKey;

	private processing: boolean = false;

	private date: Date;
	private target: Date;



	constructor(private http: Http) { }


    cacheData(start_month, start_year, end_month, end_year)
    {
      this.date = new Date(start_year,start_month-1,1);
      this.target = new Date(end_year,end_month,1);

      this.processing = true;
      this.getNYTJson();
     
    }

    getNYTJson() {

    	if (this.date < this.target) {

    		console.log('processing');
    		console.log(this.date);

	    	var month = this.date.getMonth() + 1;
	    	var year = this.date.getFullYear();

			var apiSrc =  this.apiUrl + 'import/' + year + '/' + month;

			console.log(apiSrc);

	        this.http.get(apiSrc)
	        	.map(this.extractData, this)
	        	.subscribe();

        }
        else
        {
        	this.processing=false;
        	return null;
        }


    }


    private extractData(response: Response) {
        		
		console.log('extracting');
		this.date.setMonth(this.date.getMonth() + 1); 
		this.getNYTJson();

        return response.json();
    }


    private handleError(error: Response) {
        console.log(error);
        return Observable.throw(error.json().error || "500 internal server error");
    }


}
