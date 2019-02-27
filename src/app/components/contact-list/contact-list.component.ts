import { Component, OnInit } from '@angular/core';
import {ContactService} from "../../services/contact/contact.service";
import {Pagination} from "../../models/pagination/pagination";
import {Contact} from "../../models/contact/contact";

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  constructor(private service: ContactService) { }
  public contacts: Contact[] = [];
  selectedContact:any = null;
  searchTerm: string = null;
  nextPageNo = null;
  loadingPage = null;
  ngOnInit() {
    this.loadContacts.bind(this)(1)
  }

  loadContacts(page = 1): void{
    this.loadingPage = page;
    this.service.getContacts(page)
      .subscribe(this.parseContactList.bind(this))
  }

  parseContactList(res: Pagination<Contact>): void {
    this.contacts.push(...res.results);
    if (res.next != null) {
      let params = (new URL(res.next)).searchParams;
      this.nextPageNo = params.get('page');
    } else {
      this.nextPageNo = null;
    }
    console.log(this.contacts,this.nextPageNo);
  }

  selectContact(index) {
    console.log(index);
    this.selectedContact = index;
  }

  beginSearch() {
    this.selectedContact = null;
    if (this.searchTerm)
      this.searchApi.bind(this)();
    else{
      this.contacts = [];
      this.loadContacts(1);
    }
  }

  searchApi(page = 1){
    this.service.searchContacts(this.searchTerm,page).subscribe(page => {
      this.contacts = page.results
      if (page.next != null) {
        let params = (new URL(page.next)).searchParams;
        this.nextPageNo = params.get('page');
      } else {
        this.nextPageNo = null;
      }
    })

  }

  onScroll() {
    if (this.nextPageNo && this.nextPageNo !== this.loadingPage)
      this.loadContacts(this.nextPageNo)
  }
}
