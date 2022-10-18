import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../services/loginService';
import { Injectable } from '@angular/core';
import { LoginDto } from '../home/LoginDto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  registerForm:FormGroup | any;
  submitted = false;
  loginObj:LoginDto;
  errorMessage:string;
  constructor(private loginServiceObj:LoginService, private formBuilder: FormBuilder,private router:Router, private route:ActivatedRoute){
    this.loginObj=new LoginDto();
  }
  //Add user form actions
  get f() { return this.registerForm.controls; }
  onSubmit() {
    
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    //True if all the fields are filled
    if(this.submitted)
    {
      this.loginObj.username=this.registerForm.get("email").value
      this.loginObj.password=this.registerForm.get("password").value;
  
     
     
      this.loginServiceObj.getToken(this.loginObj).subscribe(response => {
        console.log(response);
        this.submitted = true;
        console.log(response);
        if(response==true)    
        {
         localStorage.setItem('role', 'User');
         localStorage.setItem('userid', this.loginObj.username)
         this.router.navigateByUrl('/room')
        } 
         
      },
      error => {
       console.log(error);
      });
  }
  }
    ngOnInit() {
      //Add User form validations
     
  
      this.registerForm=new FormGroup({
       
        email:new FormControl('',[Validators.required, Validators.email]),
        password:new FormControl('',[Validators.required]),
      
        
      });
    }
      
    }