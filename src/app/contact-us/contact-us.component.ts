import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../services/loginService';
import { ContactUs } from './ContactUs';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  
  feedbackform:FormGroup | any;
  submitted = false;
  feedbackObj:ContactUs;
  constructor(private loginServiceObj:LoginService, private formBuilder: FormBuilder,private router:Router, private route:ActivatedRoute) {
    this.feedbackObj=new ContactUs();
   }

  ngOnInit(): void {

    this.feedbackform=new FormGroup({
     
      emailid:new FormControl('',[Validators.required, Validators.email]),
      message:new FormControl('',[Validators.required]),
      fName:new FormControl('',[Validators.required]),
      lName:new FormControl('',[Validators.required]),
      phoneNo:new FormControl('',[Validators.required]),
 
      
    });
  }
  onSubmit()
  {
    this.submitted = true;
    if(this.submitted)
    {
      this.feedbackObj.emailid=this.feedbackform.get("emailid").value
      this.feedbackObj.message=this.feedbackform.get("message").value;
      this.feedbackObj.fName=this.feedbackform.get("fName").value;
       this.feedbackObj.lName=this.feedbackform.get("lName").value;
      this.feedbackObj.phoneNo=this.feedbackform.get("phoneNo").value;
      
     
     
      this.loginServiceObj.addFeedback(this.feedbackObj).subscribe(response => {
        console.log(response);

        if(response==true)    
        {
         alert("Feedback submited successfully");
         this.feedbackform.reset();
        
        } 
        else
        {
          alert(response.message);
          this.router.navigateByUrl('/home')
        }
         
      },
      error => {
       console.log(error);
      });
    }
  }

}
