import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http, Response } from '@angular/http';
import { BookService } from './book.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  bookId: string = this._route.snapshot.params['id'];
  
  bookForm : FormGroup;

  prePopulate;

  countries;
  cities;
  companies;
  formats;
  selectedFormat : Object;
  selectedCountry : Object;
  selectedCity : Object;
  selectedCompany : Object;

  firstSubmit: boolean = false;

  constructor(
    public fb: FormBuilder,
    private _bookService : BookService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {
    this.createBookForm();
   }

  ngOnInit() {
    if(this.bookId != 'add'){
      this._bookService.getPrePopulate(this.bookId).subscribe((res:Response) => {
        this.prePopulate = res[0];
        this.bookForm.patchValue({author: this.prePopulate.author});
        this.bookForm.patchValue({description: this.prePopulate.description});
        this.bookForm.patchValue({formatId: this.prePopulate.formatId});
        this.bookForm.patchValue({isbn: this.prePopulate.isbn});
        this.bookForm.patchValue({pages: this.prePopulate.pages});
        this.bookForm.patchValue({price: this.prePopulate.price});
        this.bookForm.patchValue({publisherId: this.prePopulate.publisherId});
        this.bookForm.patchValue({title: this.prePopulate.title});
        this.bookForm.patchValue({countryId: this.prePopulate.countryId});
        this.bookForm.patchValue({cityId: this.prePopulate.cityId});
      });
    }
    this.getCountries();
    this.getCities();
    this.getCompanies();
    this.getFormats();
  }

  ngOnDestroy(){
    
  }

  getCountries(){
    this._bookService.getCountries().subscribe((res:Response) => {
      this.countries = res;
    });
  }

  getCities(){
    this._bookService.getCities().subscribe((res:Response) => {
      this.cities = res;
    });
  }

  getCompanies(){
    this._bookService.getCompanies().subscribe((res:Response) => {
      this.companies = res;
    });
  }

  getFormats(){
    this._bookService.getFormats().subscribe((res:Response) => {
      this.formats = res;
    });
  }

  postBook(){
    if(this.bookForm.valid){
      this._bookService.postBook(this.bookForm.value);
      this._router.navigate(['/showcase']);
    }else{
      this.firstSubmit = true;
    }
  }

  createBookForm(){
    this.bookForm = this.fb.group({
      author: ["", Validators.required],
      description: ["", Validators.required],
      formatId: ["", Validators.required],
      isbn: ["", Validators.required],
      pages: ["", Validators.required],
      price: ["", Validators.required],
      publisherId: ["", Validators.required],
      title: ["", Validators.required],
      countryId: ["", Validators.required],
      cityId: ["", Validators.required],
    });
  }

}
