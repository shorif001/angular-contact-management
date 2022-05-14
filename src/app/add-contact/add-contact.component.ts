import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyContact } from '../models/myContact';
import { MyGroup } from '../models/myGroup';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {

  loading:boolean = false;
  contact:MyContact = {} as MyContact;
  errorMessage:string | null = null;
  groups:any;

  constructor(private contService:ContactService, private router:Router) { }

  ngOnInit(): void {
    this.contService.getAllGroups().subscribe((data:MyGroup)=>{
      this.groups = data;
    }, (error)=>{
      this.errorMessage = error;
    })
  }


  addSubmit(){
    this.contService.createContacts(this.contact).subscribe((data:MyContact)=>{
      this.router.navigateByUrl('/').then();
    }, (error)=>{
      this.errorMessage = error;
      this.router.navigate(['/contacts/add']).then();
    })
  }

}
