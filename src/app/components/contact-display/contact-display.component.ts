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
  @Input()contact: Contact;
  @Output()contactChange: EventEmitter<Contact> = new EventEmitter();
  editContactData: Contact;
  @Output() cancelled: EventEmitter<any> = new EventEmitter();
  edit = false;
  constructor(private service: ContactService,
              private toastr: ToastrService
  ) { }
  fullName(contact){
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
        this.contactChange.emit(this.editContactData);
        this.contact = this.editContactData;
        this.edit = false;
        this.toastr.success('Saved Successfully',this.fullName(this.editContactData))
      });
  }
  deleteContact(){
    this.service.deleteContact(this.editContactData)
      .subscribe(contact => {
        console.log(contact);
        this.contactChange.emit(null);
        this.close();
        this.toastr.success('Deleted Successfully',this.fullName(this.contact))
      });
  }
  ngOnInit() {
    this.service.getContact(this.contact.id).subscribe(contact => this.contact = contact)
  }

}
