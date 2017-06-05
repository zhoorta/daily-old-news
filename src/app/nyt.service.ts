import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { environment } from '../environments/environment';

@Injectable()
export class NYTService {


    //private apiUrl = 'https://api.nytimes.com/svc/archive/v1/1917/6.json';

    private apiUrl = environment.apiUrl;
    private apiKey = environment.apiKey;
    private localStorage = environment.localStorage;
    private localStorageLocation = environment.localStorageLocation;



    public searchDate: string;
    
    public today: any;
    public yesterday: any;

    public current_year: any;
    public year: any;
    public month: any;
    public day: any;

  	constructor(private http: Http) { 

          this.setupDates();
    }


    getArticles = (): Observable<any> => {

        var apiSrc: string;

        if(this.localStorage) apiSrc = this.localStorageLocation + this.year + this.month + '.json';
        else apiSrc = this.apiUrl + this.year + '/' + this.month + '.json?api-key=' + this.apiKey;

        this.searchDate = this.year + '-' + this.month + '-' + this.day;


        //return this.http.get(this.newsAPI  + '?api-key=' + this.apiKey)
        return this.http.get(apiSrc)
        	.map(this.extractData, this)
            .catch(this.handleError);
    }


    private extractData(response: Response) {
        let body = response.json();

        var pub_date: string;
        var ret_val : any = [];

        for(let data of body.response.docs) {

          pub_date = data.pub_date;
          if(pub_date.substring(0,10)==this.searchDate) {
              ret_val.push(data);
          }

        }

        return ret_val || {};
    }

    private setupDates()
    {
        
        this.today = new Date();

        this.current_year = this.today.getFullYear();
        this.year = this.current_year - 100;
        this.month = this.today.getMonth() +1;
        this.day = this.today.getDate();

        if(this.month < 10) this.month = '0'+ this.month;
        if(this.day < 10) this.day = '0'+ this.day;

        this.yesterday = new Date(this.year, this.month, this.month);
    }

    getYearSearchDate(year)
    {
        return year + '-' + this.month + '-' + this.day;
    }


    getLastUpdate(year)
    {
        return this.current_year - year;
    }


    private handleError(error: Response) {
        console.log(error);
        return Observable.throw(error.json().error || "500 internal server error");
    }


}
