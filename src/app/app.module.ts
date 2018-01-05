import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BookComponent } from './book/book.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ShowcaseComponent } from './showcase/showcase.component';
import { SearchComponent } from './search/search.component';
import { ShowcaseService } from './showcase/showcase.service';
import { HeaderService } from './header.service';

import { HttpModule } from '@angular/http';
import { BookService } from './book/book.service';
import { SearchService } from './search/search.service';

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    NavigationComponent,
    ShowcaseComponent,
    SearchComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    RouterModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ShowcaseService,
    HeaderService,
    BookService,
    SearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
