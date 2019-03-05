import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {NgProgressModule} from "ngx-progressbar";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {MaterialModule} from "./modules/material.module";
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactDisplayComponent } from './components/contact-display/contact-display.component';
import { ContactListItemComponent } from './components/contact-list-item/contact-list-item.component';
import {ApiInterceptor} from "./interceptors/api-interceptor.service";
import {FormsModule} from "@angular/forms";
import {InfiniteScrollModule} from "ngx-infinite-scroll";

@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    ContactDisplayComponent,
    ContactListItemComponent,
  ],
  imports: [
    InfiniteScrollModule,
    FormsModule,
    MaterialModule,
    BrowserModule,
    NgProgressModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
