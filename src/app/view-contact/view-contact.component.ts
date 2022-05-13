import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyContact } from '../models/myContact';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.scss']
})
export class ViewContactComponent implements OnInit {

  contactId:string | null = null;
  loading:boolean = false;
  contact:MyContact = {} as MyContact;
  errorMessage:string | null = null;

  constructor(private activatedRoute:ActivatedRoute, private contService:ContactService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param)=>{
      console.log(param);
      this.contactId = param.get('contactId');
    })
    if(this.contactId){
      this.loading = true;
      this.contService.getContacts(this.contactId).subscribe((data:MyContact)=>{
        this.contact = data;
        this.loading = false;
      }, (error)=>{
        this.errorMessage = error;
        this.loading = false;
      })
    }
  }

  isNotEmpty(){
    return Object.keys(this.contact).length >0;
  }

  
}
