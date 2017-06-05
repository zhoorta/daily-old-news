import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { NYTService } from './nyt.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	
    title = 'Daily Old News';
    sub_title = 'Data provided by nyt api';

  	public nyt_articles$: Observable<any>;
  	public archive_date;

    private years = [];
    private selected_year: number;


    constructor(private nytService: NYTService) {}


  	ngOnInit() {

      //this.selected_year = this.nytService.year;
      this.selected_year = 0;
      this.years.push(this.nytService.year); 
      this.years.push(this.nytService.year + 50); 
      this.years.push(this.nytService.year + 75);

      this.nyt_articles$ = this.nytService.getArticles();
    
  	}

  	changeYear(year)
  	{

      this.selected_year = this.nytService.year = year;
      if(year>0) this.nyt_articles$ = this.nytService.getArticles();

  	}

}
