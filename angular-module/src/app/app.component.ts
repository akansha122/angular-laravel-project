import { Component } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-module';
  user_info=localStorage.getItem('user_session'); 
  base_url="http://localhost/project/laravel-module/";
  subscribeForm:FormGroup;
  constructor(private fb:FormBuilder,private http:HttpClient) { 
    this.subscribeForm=fb.group({
      email:'',
    });
  }
  subscribe_now(subscribeForm){
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
  let options={
    headers:headers,
  };
  this.http.post(this.base_url+'public/api/subscribe',subscribeForm.value,options).subscribe((data)=>{
    let resp1 = Array.from(Object.keys(data), k=>data[k]);
    if(resp1[0]=='true'){
       alert('Thanks for the subscribe');
       this.subscribeForm.reset();
       
    }
    else{
     alert('Please try again');
    }
   });
      console.log(subscribeForm.value);
  }
  
}


