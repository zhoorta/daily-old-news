import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { NYTService } from './nyt.service';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	
    title = 'Daily Old News';
    sub_title = 'Data provided by nyt api';

  	public nyt_articles$: Observable<any>;

    public years = [];
    public isDateSelected: boolean = false;

    public ctrl_date;
    public curr_date;


    constructor(private nytService: NYTService) {}


  	ngOnInit() {


      //this.isDateSelected = false;
      //this.isDateSelected = false;
      this.years.push(this.nytService.year); 
      this.years.push(this.nytService.year + 50); 
      this.years.push(this.nytService.year + 75);

      //this.nyt_articles$ = this.nytService.getArticles();
    
  	}

    changeDay(day_to_add)
    {
      var current = new Date(this.nytService.searchDate);
      current.setDate(current.getDate() + day_to_add);

      this.nytService.setDate(current);
      this.nyt_articles$ = this.nytService.getArticles();

    }

    resetDate()
    {
      this.curr_date = null;
      this.isDateSelected = false;
      this.nytService.resetDate()
    }

    changeDate(date,sync_ctrl=false)
    {

      if (!date) { this.resetDate(); }
      else {

        if(sync_ctrl) this.curr_date = date; 

        this.nytService.refreshingData = true;
        this.isDateSelected = true;
        
        this.nytService.setDate(new Date(date));
        this.nyt_articles$ = this.nytService.getArticles();

      }
      

    }

}
