import { Injectable } from '@angular/core';
import { HeaderService } from '../header.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class BookService {

  constructor(
   private _headerService : HeaderService,
   private http: Http
  ) { }

  getCountries() {
    let autheaders = new Headers();
    this._headerService.addHeaders(autheaders);
    return this.http.get(`http://localhost:3004/countries`, {
      headers: autheaders
    }).map((res:Response) => res.json());
  }

  getCities() {
    let autheaders = new Headers();
    this._headerService.addHeaders(autheaders);
    return this.http.get(`http://localhost:3004/cities`, {
      headers: autheaders
    }).map((res:Response) => res.json());
  }

  getCompanies() {
    let autheaders = new Headers();
    this._headerService.addHeaders(autheaders);
    return this.http.get(`http://localhost:3004/publishers`, {
      headers: autheaders
    }).map((res:Response) => res.json());
  }

  getFormats() {
    let autheaders = new Headers();
    this._headerService.addHeaders(autheaders);
    return this.http.get(`http://localhost:3004/formats`, {
      headers: autheaders
    }).map((res:Response) => res.json());
  }

  getPrePopulate(id: string){
    let autheaders = new Headers();
    this._headerService.addHeaders(autheaders);
    return this.http.get(` http://localhost:3004/books`, {
      headers: autheaders,
      params: {
        id: id
      }
    }).map((res:Response) => res.json());
  }

  postBook(book){
    let autheaders = new Headers();
    this._headerService.addHeaders(autheaders);
    const req = this.http.post('http://localhost:3004/books', book, {
      headers: autheaders
    })
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Error occured");
        }
      );
  }

}
