import { Component, OnInit } from '@angular/core';
import { MyContact } from '../models/myContact';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.scss']
})
export class ContactManagerComponent implements OnInit {

  
  public loading:boolean = false;
  public contacts:any = [];
  public errorMessage:string | null = null;

  constructor(private contService:ContactService) { }

  ngOnInit(): void {
    this.loading = true;
    this.contService.getAllContacts().subscribe((data:MyContact)=>{
      this.contacts = data;
      this.loading = false;
    }, (error)=>{
      this.errorMessage = error;
      this.loading = false;
    })
  }

}
