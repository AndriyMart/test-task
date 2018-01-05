import { Injectable } from '@angular/core';
import { HeaderService } from '../header.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class SearchService {

  constructor(
    private _headerService: HeaderService,
    private http: Http,
    private _route: ActivatedRoute
  ) { }

  getFormats() {
    let autheaders = new Headers();
    this._headerService.addHeaders(autheaders);
    return this.http.get(`http://localhost:3004/formats`, {
      headers: autheaders
    }).map((res:Response) => res.json());
  }

  searchQuery(){
    let params = this._route.snapshot.queryParams;
    let paramsQuery : Object = {};
    if(params.isbn && params.isbn.length>0){
      const isbnObj : Object = {isbn : params.isbn};
      Object.assign(paramsQuery, isbnObj);
    }
    if(params.formatId && params.formatId > 0){
      const formatObj : Object = {formatId : params.formatId};
      Object.assign(paramsQuery, formatObj);
    }
    let autheaders = new Headers();
    this._headerService.addHeaders(autheaders);
    return this.http.get(` http://localhost:3004/books`, {
      headers: autheaders,
      params : paramsQuery
    }).map((res:Response) => res.json());

  }
  

}
