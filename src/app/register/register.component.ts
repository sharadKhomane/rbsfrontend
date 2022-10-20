import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../services/loginService';
import { RegisterDTO } from './RegisterDTO';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

register:FormGroup | any;
submitted = false;
registerObj:RegisterDTO;
  constructor(private loginServiceObj:LoginService, private formBuilder: FormBuilder,private router:Router, private route:ActivatedRoute) {
    this.registerObj=new RegisterDTO();
   }
  get f() { return this.register.controls; }
  ngOnInit(): void {

    this.register=new FormGroup({
     
      email:new FormControl('',[Validators.required, Validators.email]),
      password:new FormControl('',[Validators.required]),
      firstName:new FormControl('',[Validators.required]),
      middleName:new FormControl('',[Validators.required]),
      lastName:new FormControl('',[Validators.required]),
      phoneNo:new FormControl('',[Validators.required]),
    
      
    });
  }

  onSubmit()
  {
    this.submitted = true;
    // stop here if form is invalid
    if (this.register.invalid) {
        return;
    }
    //True if all the fields are filled
    if(this.submitted)
    {
      this.registerObj.emailId=this.register.get("email").value
      this.registerObj.password=this.register.get("password").value;
      this.registerObj.firstName=this.register.get("firstName").value;
      this.registerObj.middleName=this.register.get("middleName").value;
      this.registerObj.lastName=this.register.get("lastName").value;
      this.registerObj.phoneNo=this.register.get("phoneNo").value;
      
     
     
      this.loginServiceObj.registerUser(this.registerObj).subscribe(response => {
        console.log(response);
        this.submitted = true;
        console.log(response);
        if(response.result==true)    
        {
         this.router.navigateByUrl('/login')
        } 
        else
        {
          alert(response.message);
        }
         
      },
      error => {
       console.log(error);
      });
    }

  }

}
