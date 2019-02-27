import { Component } from '@angular/core';
import {Contact} from "./models/contact/contact";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedContact: Contact = null;
}
