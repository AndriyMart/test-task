import { Component, OnInit } from '@angular/core';
import { ShowcaseService } from './showcase.service';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss']
})
export class ShowcaseComponent implements OnInit {

  bookList;

  constructor(
    private _showcaseService: ShowcaseService
  ) { }

  ngOnInit() {
    this._showcaseService.getBooks().subscribe((res:Response) => {
      this.bookList = res;
    });
  }

 

}
