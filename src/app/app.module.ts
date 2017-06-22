import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { NYTService } from './nyt.service';
import { AdminToolsService } from './admin-tools.service';

import { DatepickerModule } from 'angular2-material-datepicker';
import { DateModalComponent } from './date-modal/date-modal.component'

@NgModule({
  declarations: [
    AppComponent,
    DateModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DatepickerModule
  ],
  providers: [NYTService, AdminToolsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
