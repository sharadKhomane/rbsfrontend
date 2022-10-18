import { Component, OnInit, ElementRef,ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookedDetails } from '../BookedDetails';
import { RoomerviceService } from '../roomservice.service';
import { Injectable } from '@angular/core';
import { roomType } from './roomType';
import { roomDetails } from './room.details';
declare var $: (arg0: any) => { (): any; new(): any; modal: { (arg0: string): void; new(): any; }; };
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  myGroup:FormGroup | any;
  room:BookedDetails;
  submitted = false;
  result1:Date;
  maxdate:string;
  mindate:string;
  listOfRoomType:roomType[];
  objRoomDetails:roomDetails[];
  errorMessage: string; 
  userId:string | null;

  @ViewChild('someModal') someModal:ElementRef; 
  @ViewChild('sModal') sModal: ElementRef

  constructor(private roomerviceServiceObj:RoomerviceService,private router:Router, private route:ActivatedRoute) {
    this.room=new BookedDetails;
   }
  

  ngOnInit(): void {
    var todayDate=new Date();
    this.mindate=todayDate.toISOString().slice(0, 10);
    this.result1 = this.addDays(30, todayDate);
    this.maxdate=this.result1.toISOString().slice(0, 10);
    this.getAllRoomType();
    this.readLocalStorageValue('User');
    this.myGroup=new FormGroup({
      roomCount:new FormControl('',[Validators.required]),
      checkIn:new FormControl('',[Validators.required]),
      checkOut:new FormControl('',[Validators.required]),
      roomType:new FormControl('',[Validators.required])
      
    });
  
  }
  getAllRoomType() {
    this.roomerviceServiceObj.findAllRoomType().subscribe(res => this.listOfRoomType = res, error => this.errorMessage = <any>error);
  }
   addDays(numOfDays: number, date = new Date()) {
    date.setDate(date.getDate() + numOfDays);
  
    return date;
  }
  get f(): { [key: string]: AbstractControl } {
    return this.myGroup.controls;
  }
  bookRooms()
  {
    if (this.myGroup.invalid) {
      return;
    }
     this.room.checkIn=this.myGroup.get("checkIn").value;
     this.room.checkOut=this.myGroup.get("checkOut").value;
     this.room.roomCount=this.myGroup.get("roomCount").value;
     this.room.typeId=this.myGroup.get("roomType").value;
     console.log(this.room.checkIn);
     console.log(this.room.checkOut);
     console.log(this.room.roomCount);
     console.log(this.room.typeId);
   
     this.roomerviceServiceObj.bookRooms(this.room).subscribe(response => {
       console.log("hhhhhhhhhhh"+response);
       this.submitted = true;
       this.userId =   localStorage.getItem("userid");
         this.objRoomDetails = response
         console.log("To string method works:: "+this.objRoomDetails);
     },
     error => {
      console.log(error);
     });
    
    $(this.someModal.nativeElement).modal('show'); 
   }
  closePopup()
  {
    $(this.someModal.nativeElement).modal('hide'); 
    this.myGroup.reset();
  }
  clearForm()
  {
    this.myGroup.reset();
  }
  readLocalStorageValue(key:string) {
    this.userId =   localStorage.getItem(key);
    console.log("-------"+this.userId);
  }

 

}


