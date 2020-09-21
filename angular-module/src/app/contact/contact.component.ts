import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http'

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm:FormGroup;
  base_url="http://localhost/project/laravel-module/";
  constructor(private fb:FormBuilder,private http:HttpClient) { 
    this.contactForm=fb.group({
      name:'',
      email:'',
      mobile_no:'',
      message:''
    });
  }
  
  ngOnInit(): void {
  }
  save_contact(contactForm)
  {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
  let options={
    headers:headers,
  };
  this.http.post(this.base_url+'public/api/contact_form',contactForm.value,options).subscribe((data)=>{
    let resp1 = Array.from(Object.keys(data), k=>data[k]);
    if(resp1[0]=="true"){
       alert('Contact Query Successfully Send');
       this.contactForm.reset();
      
    }
    else{
     alert('Please try again');
    }
   });
      console.log(contactForm.value);
  }


}
