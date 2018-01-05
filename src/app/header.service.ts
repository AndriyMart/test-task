import { Injectable } from '@angular/core';

@Injectable()
export class HeaderService {

  constructor() { }

  addHeaders(header){
    header.append('x-auth-token', 'bad18eba1ff45jk7858b8ae88a77fa30');
    return header;
  }

}
