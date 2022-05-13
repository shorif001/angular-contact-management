import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MyContact } from '../models/myContact';
import { MyGroup } from '../models/myGroup';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  baseUrl:string = "http://localhost:4000";
  
  constructor(private http:HttpClient) { }

  //Get All Contacts Data
  getAllContacts():Observable<MyContact>{
    let dataUrl:string = `${this.baseUrl}/contacts`;
    return this.http.get<MyContact>(dataUrl).pipe(catchError(this.handleError))
  }

  //get single contacts
  getContacts(contactId:string):Observable<MyContact>{
   let dataUrl:string = `${this.baseUrl}/contacts/${contactId}`
   return this.http.get<MyContact>(dataUrl).pipe(catchError(this.handleError));
  }

  //create Contacts
  createContacts(contact:MyContact):Observable<MyContact>{
    let dataUrl:string = `${this.baseUrl}/contacts`;
    return this.http.post<MyContact>(dataUrl,contact).pipe(catchError(this.handleError))
  }

  //Update Contacts

  updateContacts(contact:MyContact, contactId:string):Observable<MyContact>{
    let dataUrl:string = `${this.baseUrl}/contacts/${contactId}`;
    return this.http.put<MyContact>(dataUrl,contact).pipe(catchError(this.handleError))
  }

  //Delect Contact
  deleteContacts(contactId:string):Observable<MyContact>{
    let dataUrl:string = `${this.baseUrl}/contacts/${contactId}`;
    return this.http.delete<MyContact>(dataUrl).pipe(catchError(this.handleError))
  }

  //get all Group

  getAllGroups():Observable<MyGroup>{
    let dataUrl:string = `${this.baseUrl}/groups`;
    return this.http.get<MyGroup>(dataUrl).pipe(catchError(this.handleError))
  }

  //get single Group
  getGroup(contact:MyContact):Observable<MyGroup>{
    let dataUrl:string = `${this.baseUrl}/groups/${contact.groupId}`;
    return this.http.get<MyGroup>(dataUrl).pipe(catchError(this.handleError));
   }

  //Error Solve
  handleError(error:HttpErrorResponse){
    let errorMessage:string = '';
    if(error.error instanceof ErrorEvent){
      //client Error
      errorMessage = `Error : ${error.error.message}`
    }else{
      //server side error
      errorMessage = `Status: ${error.status} \n Message: ${error.message}`;
    }
    return throwError(errorMessage)
  }
}
