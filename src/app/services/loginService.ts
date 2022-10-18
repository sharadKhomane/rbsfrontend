import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs-compat/Observable';
import { LoginDto } from '../home/LoginDto';
import { RegisterDTO } from '../register/RegisterDTO';
import { RegisterReponseModel } from '../model/RegisterReponseModel';
import { ContactUs } from '../contact-us/ContactUs';



@Injectable({
  providedIn: 'root'
})
export class LoginService {
 
 
  
private url:string='';
private status:string='';
  constructor(private http:HttpClient) {
  
    this.url="http://localhost:81";
   }

   registerUser(registerObj: RegisterDTO):Observable<RegisterReponseModel> {
    return this.http.post<RegisterReponseModel>(this.url+"/register",registerObj);
  
  }
 
   getToken(login: LoginDto) {
      return this.http.post<any>(this.url+"/login",login);
  }

  getAdminToken(login: LoginDto) {
    return this.http.post<any>(this.url+"/adminLogin",login);
  }
  addFeedback(feedbackObj: ContactUs) {
    return this.http.post<any>(this.url+"/addFeedback",feedbackObj);
  }
}
