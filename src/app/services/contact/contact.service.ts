import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observer} from "rxjs/internal/types";
import {Observable} from "rxjs/internal/Observable";
import {Contact} from "../../models/contact/contact";
import {Pagination} from "../../models/pagination/pagination";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private _get_contacts = 'contacts/';

  constructor(private _http: HttpClient) { }

  getContacts(page): Observable<Pagination<Contact>>{
    return this._http.get<Pagination<Contact>>(this._get_contacts + '?page='+page);
  }

  searchContacts(search, page): Observable<Pagination<Contact>>{
    return this._http.get<Pagination<Contact>>(this._get_contacts + '?search='+search+'&page='+page);
  }


  getContact(id): Observable<Contact> {
    return this._http.get<Contact>(this._get_contacts +id+'/');
  }

  addContact(contact: Contact): Observable<Contact> {
    return this._http.post<Contact>(this._get_contacts,contact);
  }

  editContact(contact: Contact): Observable<Contact> {
    return this._http.put<Contact>(this._get_contacts +contact.id+'/',contact);
  }

  deleteContact(contact: Contact): Observable<Contact> {
    return this._http.delete<Contact>(this._get_contacts +contact.id+'/');
  }

}
