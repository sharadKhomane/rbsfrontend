import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomerviceService } from './roomservice.service';
import { RoomtypeComponent } from './roomtype/roomtype.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'rbs';
  obj:RoomtypeComponent 
  constructor(private roomerviceServiceObj:RoomerviceService,private router:Router) {
   

   }
  ngOnInit(): void {
   
  }
  runfun1()
  {
    this.obj.getRoomType();
  }

  readLocalStorageValue(key:string) {
    let value =   localStorage.getItem(key);
    console.log("-------"+value);
  
    if(value == undefined) {
      value =='';
    }
    return value;
  }

  logout()
  {
    localStorage.setItem('role', '');
    localStorage.setItem('userid', '');
    this.router.navigateByUrl('/adminlogin')
  }

  logoutUser()
  {
    localStorage.setItem('role', '');
    localStorage.setItem('userid', '');
    this.router.navigateByUrl('/login')
  }

}
