import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { HeaderService } from '../header.service';

@Injectable()
export class ShowcaseService {

  constructor(
    private http: Http,
    private _headerService: HeaderService
  ) { }
  
  getBooks() {
    let autheaders = new Headers();
    this._headerService.addHeaders(autheaders);
    return this.http.get(` http://localhost:3004/books`, {
      headers: autheaders
    }).map((res:Response) => res.json());
  }

}
