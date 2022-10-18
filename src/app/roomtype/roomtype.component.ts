import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { roomType } from '../room/roomType';
import { RoomerviceService } from '../roomservice.service';
import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: (arg0: any) => { (): any; new(): any; modal: { (arg0: string): void; new(): any; }; };
@Component({
  selector: 'app-roomtype',
  templateUrl: './roomtype.component.html',
  styleUrls: ['./roomtype.component.css']
})
export class RoomtypeComponent implements OnInit {

  listOfRoomType:roomType[];
  addTypeForm:FormGroup | any;
  roomTypeObj:roomType;
  submitted = false;
  @ViewChild('someModal') someModal:ElementRef; 
  constructor(private roomerviceServiceObj:RoomerviceService,private router:Router, private route:ActivatedRoute) {
      this.roomTypeObj=new roomType();
   }
  errorMessage:string;

  ngOnInit(): void {
    this.getRoomType();
    this.addTypeForm=new FormGroup({
     
      roomTypes:new FormControl('',[Validators.required]),
      maxCapaity:new FormControl('',[Validators.required]),
      price:new FormControl('',[Validators.required]),
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.addTypeForm.controls;
  }
  getRoomType() {
   
    this.roomerviceServiceObj.findAllRoomType().subscribe(res => this.listOfRoomType = res, error => this.errorMessage = <any>error);
    
  }

  openModel()
  {
    $(this.someModal.nativeElement).modal('show'); 
   
  }

  save()
  {
    if (this.addTypeForm.invalid) {
      return;
    }
   this.roomTypeObj.roomTypes=this.addTypeForm.get("roomTypes").value;
   this.roomTypeObj.maxCapaity=this.addTypeForm.get("maxCapaity").value;
   this.roomTypeObj.price=this.addTypeForm.get("price").value;
   this.roomerviceServiceObj.addRoomInfo(this.roomTypeObj).subscribe((response: any) => {
    if(response==true)    
    {
      $(this.someModal.nativeElement).modal('hide'); 
      this.getRoomType();
      this.router.navigateByUrl('/roomtype')
      
    } 
  },
     (  error: any) => {
   console.log(error);
  });
   

  }
   clear()
   {
    $(this.someModal.nativeElement).modal('hide'); 
   }

   deleteRoomType(id:number)
   {
    this.roomerviceServiceObj.deleteRoomType(id).subscribe((response: any) => {
    
       if(response==true)    
       {
         $(this.someModal.nativeElement).modal('hide'); 
         this.getRoomType();
         this.router.navigateByUrl('/roomtype')
         
       } 
     },
        (  error: any) => {
      console.log(error);
     });
      
   }
 

}


