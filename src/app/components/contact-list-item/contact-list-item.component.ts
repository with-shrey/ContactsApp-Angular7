import {Component, Input, OnInit} from '@angular/core';
import {Contact} from "../../models/contact/contact";

@Component({
  selector: 'app-contact-list-item',
  templateUrl: './contact-list-item.component.html',
  styleUrls: ['./contact-list-item.component.scss']
})
export class ContactListItemComponent implements OnInit {
  @Input()contact: Contact;
  constructor() { }

  ngOnInit() {
  }

}
