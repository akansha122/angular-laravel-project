import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http'

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  feedback_form:FormGroup;
  base_url="http://localhost/project/laravel-module/";
  feedback_type={'id':'','title':''};
  constructor(private http:HttpClient, private fb:FormBuilder) { 
    this.feedback_form=fb.group({
      name:'',
      email:'',
      mobile_no:'',
      feedback_type:'',
      message:''
    });
  
  }

  ngOnInit(): void {
    this.http.get(this.base_url+'public/api/get_feedback_type').subscribe((data)=>{
      let resp1 = Array.from(Object.keys(data), k=>data[k]);  
      this.feedback_type=resp1[2];
      console.log(this.feedback_type);
      });
    
  }
  save_feedback(feedback_form)
  {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
  let options={
    headers:headers,
  };
  this.http.post(this.base_url+'public/api/save_feedback',feedback_form.value,options).subscribe((data)=>{
    let resp1 = Array.from(Object.keys(data), k=>data[k]);
    if(resp1[0]=="true"){
      alert('Feedback Successfully Send');
      this.feedback_form.reset();
   }
   else{
    alert('Feedback Not Send');
   }
  });
  
  //  console.log(resp1);
   // console.log(feedback_form.value)

}
}
