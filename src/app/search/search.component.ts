import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SearchService } from './search.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  format: string;
  formats;
  paramsSub: any;
  filteredItems: Object[];
  notValidPages: boolean = false;
  notValidPrices: boolean = false;

  @ViewChild('authorInput') authorInput: ElementRef;
  @ViewChild('titleInput') titleInput: ElementRef;
  @ViewChild('isbnInput') isbnInput: ElementRef;
  @ViewChild('pagesMinInput') pagesMinInput: ElementRef;
  @ViewChild('pagesMaxInput') pagesMaxInput: ElementRef;
  @ViewChild('priceMinInput') priceMinInput: ElementRef;
  @ViewChild('priceMaxInput') priceMaxInput: ElementRef;

  constructor(
    private _searchService: SearchService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location 
  ) { }

  ngOnInit() {
    if(this._route.snapshot.queryParams){
      this.setFormValues();
      this._searchService.searchQuery().subscribe((res:Response) => {
        this.filteredItems = this.filter(res);
      });
    }
    this.getFormats();
  }

  setFormValues(){
    const setedParams = this._route.snapshot.queryParams;
    if(setedParams.author)
      this.authorInput.nativeElement.value = setedParams.author;
    if(setedParams.title)
      this.titleInput.nativeElement.value = setedParams.title;
    if(setedParams.isbn)
      this.isbnInput.nativeElement.value = setedParams.isbn;
    if(setedParams.formatId)
    this.format = setedParams.formatId;
    if(setedParams.pagemin)
      this.pagesMinInput.nativeElement.value = setedParams.pagemin;
    if(setedParams.pagemax)
      this.pagesMaxInput.nativeElement.value = setedParams.pagemax;
    if(setedParams.pricemin)
      this.priceMinInput.nativeElement.value = setedParams.pricemin;
    if(setedParams.pricemax)
      this.priceMaxInput.nativeElement.value = setedParams.pricemax;
  }

  getFormats(){
    this._searchService.getFormats().subscribe((res:Response) => {
      this.formats = res;
    });
  }

  filter(result){
    let filteredItems : Object[] = [];
    let params = this._route.snapshot.queryParams;
    if(params.pricemin && params.pricemax && parseInt(params.pricemin) > parseInt(params.pricemax)){
      this.notValidPrices = true;
    }else{
      this.notValidPrices = false;
    }
    if(params.pagemin && params.pagemax && parseInt(params.pagemin) > parseInt(params.pagemax)){
      this.notValidPages = true;
    }else{
      this.notValidPages = false;
    }
    for(let res of result){
      if(params.author && params.author.length>0 && res.author
        && !res.author.toLowerCase().includes(params.author.toLowerCase())){
          continue;
      }else if(params.title && params.title.length>0 && res.title
        && !res.title.toLowerCase().includes(params.title.toLowerCase())){
          continue;
      }else if(params.pagemin && params.pagemin.length>0 && params.pagemax && params.pagemax.length>0 
        && res.pages && !(res.pages >= params.pagemin && res.pages <= params.pagemax)){
          continue;
      }else if(params.pagemin && params.pagemin.length>0 && !params.pagemax 
        && res.pages && !(res.pages >= params.pagemin)){
          continue;
      }else if(params.pagemax && params.pagemax.length>0 && !params.pagemin 
        && res.pages && !(res.pages <= params.pagemax)){
          continue;
      }else if(params.pricemin && params.pricemax && params.pricemin.length>0 && params.pricemax.length>0 
        && res.price && !(res.price >= params.pricemin && res.price <= params.pricemax)){
          continue;
      }else if(params.pricemin && !params.pricemax && params.pricemin.length>0
        && res.price && !(res.price >= params.pricemin)){
          continue;
      }else if(!params.pricemin && params.pricemax && params.pricemax.length>0 
        && res.price && !(res.price <= params.pricemax)){
          continue;
      }
      filteredItems.push(res);
    }
    return filteredItems;
  }

  settingQuery(key, value){
    let paramsQuery: object;
    switch(key) {
      case 1:
        paramsQuery = {author : value}
          break;
      case 2:
        paramsQuery = {title: value}
          break;
      case 3:
        paramsQuery = {isbn: value}
          break;
      case 4:
        paramsQuery = {formatId: value}
          break;
      case 5:
        paramsQuery = {pagemin: value}
          break;
      case 6:
        paramsQuery = {pagemax: value}
          break;
      case 7:
        paramsQuery = {pricemin: value}
          break;
      case 8:
        paramsQuery = {pricemax: value}
          break;
      default:
    }
    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: paramsQuery,
      queryParamsHandling: 'merge', 
    }).then(()=>{
      this._searchService.searchQuery().subscribe((res:Response) => {
        this.filteredItems = this.filter(res);
      });
    });
  }

}
