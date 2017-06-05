import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nyturl'
})
export class NYTUrlPipe implements PipeTransform {

  private nyt_query_server = 'query.nytimes.com';
  private nyt_query_server_redirect = 'http://query.nytimes.com/mem/archive-free/pdf';

  transform(value: string, args?: any): any {
  	
  	if (value.length && value.indexOf(this.nyt_query_server)!=-1) {

  		return this.nyt_query_server_redirect + value.substr(value.indexOf("?"));
  	}

  	return value;
  }

}
