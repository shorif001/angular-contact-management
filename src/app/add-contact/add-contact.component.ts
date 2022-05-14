import { Component, OnInit } from '@angular/core';
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
  groups:MyGroup = {} as MyGroup;

  constructor(private contService:ContactService) { }

  ngOnInit(): void {
    this.contService.getAllGroups().subscribe((data:MyGroup)=>{
      this.groups = data;
    }, (error)=>{
      this.errorMessage = error;
    })
  }

}
