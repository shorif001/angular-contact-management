import { Component, OnInit } from '@angular/core';
import { MyContact } from '../models/myContact';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.scss']
})
export class ContactManagerComponent implements OnInit {

  loading:boolean = false;
  contacts:MyContact[] = [];
  errorMessage:string | null = null;

  constructor(private cantService:ContactService) { }

  ngOnInit(): void {
    this.loading = true;
    this.cantService.getAllContacts().subscribe((data:MyContact[])=>{
      this.contacts = data;
      this.loading = false;
    })
  }

}
