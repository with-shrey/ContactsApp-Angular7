import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Contact} from "../../models/contact/contact";
import {ContactService} from "../../services/contact/contact.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-contact-display',
  templateUrl: './contact-display.component.html',
  styleUrls: ['./contact-display.component.scss']
})
export class ContactDisplayComponent implements OnInit {
  contact: Contact;
  @Input('_contact')
  set _contact(contact: Contact) {
    this.service.getContact(contact.id).subscribe(contact => this.contact = contact);
    this.contact = contact;
    this.edit = false;
  }
  @Output()_contactChange: EventEmitter<Contact> = new EventEmitter();
  editContactData: Contact;
  @Output() cancelled: EventEmitter<any> = new EventEmitter();
  edit = false;
  constructor(private service: ContactService,
              private toastr: ToastrService
  ) { }
  static fullName(contact){
    return contact.first_name+ ' '+contact.last_name
  }
  setEdit(){
    this.edit = true;
    this.editContactData= {...this.contact};
  }
  close(){
    this.cancelled.emit(null);
  }
  saveContact(){
    this.service.editContact(this.editContactData)
      .subscribe(status => {
        console.log(status);
        this._contactChange.emit(this.editContactData);
        this.contact = this.editContactData;
        this.edit = false;
        this.toastr.success('Saved Successfully',ContactDisplayComponent.fullName(this.editContactData))
      });
  }
  deleteContact(){
    this.service.deleteContact(this.editContactData)
      .subscribe(contact => {
        console.log(contact);
        this._contactChange.emit(null);
        this.close();
        this.toastr.success('Deleted Successfully',ContactDisplayComponent.fullName(this.contact))
      });
  }
  ngOnInit() {
  }

}
