import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MyContact } from '../models/myContact';
import { MyGroup } from '../models/myGroup';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent implements OnInit {

  loading:boolean = false;
  contactId:string | null = null;
  contact: MyContact = {} as MyContact;
  errorMessage:string | null = null;
  groups:any;

  constructor(private activatedRoute:ActivatedRoute, private contService:ContactService, private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param)=>{
      this.contactId = param.get('contactId')
    });
    if(this.contactId){
      this.contService.getContacts(this.contactId).subscribe((data:MyContact)=>{
        this.contact = data;
        this.loading = false;
        this.contService.getAllGroups().subscribe((data:MyGroup)=>{
          this.groups = data;
        })
      }, (error)=>{
        this.errorMessage = error;
        this.loading = false;
      })
    }
  }

  submitUpdate(){
    if(this.contactId){
      this.contService.updateContacts(this.contact, this.contactId).subscribe((data:MyContact)=>{
        this.router.navigateByUrl('/').then();
      }, (error)=>{
        this.errorMessage = error;
        this.router.navigate([`/contacts/edit/${this.contact}`]).then();
      })
    }
    
  }



}
