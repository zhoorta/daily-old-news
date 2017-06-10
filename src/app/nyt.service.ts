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
    private apiKey = environment.apiKey

    private nytApiUrl = environment.apiUrl;
    private nytApiKey = environment.apiKey;

    public refreshingData: boolean = false;
    public searchDate: string;

    public current_year: any;
    public year: any;
    public month: any;
    public day: any;

    public totalArticles: number = 0;

  	constructor(private http: Http) { 

      this.resetDate();
    }


    getArticles = (): Observable<any> => {

        //var apiSrc =  this.apiUrl + this.year + '/' + this.month + '.json?api-key=' + this.apiKey;
        var apiSrc =  this.apiUrl + 'docs/' + this.year + '/' + this.month + '/' + this.day;

        return this.http.get(apiSrc)
        	.map(this.extractData, this)
            .catch(this.handleError);
    }


    private extractData(response: Response) {
        let articles = response.json();

        this.refreshingData = false;

        this.totalArticles = articles.length;

        return articles;
    }
    

    public resetDate()
    {
      var today = new Date();
      this.current_year = today.getFullYear();

      this.setDate(new Date(this.current_year - 100, today.getMonth(), today.getDate()))
    }

    public setDate(date: Date)
    {

      this.totalArticles = 0;
      this.year = date.getFullYear();
      this.month = date.getMonth() + 1;
      this.day = date.getDate();

      if(this.month < 10) this.month = '0'+ this.month;
      if(this.day < 10) this.day = '0'+ this.day;

      this.searchDate = this.year + '-' + this.month + '-' + this.day;
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
