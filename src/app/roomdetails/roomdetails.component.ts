import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { roomType } from '../room/roomType';
import { RoomerviceService } from '../roomservice.service';
import { RoomInfoDTO } from './RoomInfoDTO';
import { Injectable } from '@angular/core';
import { AddDetails } from './AddDetails';
import { RegisterReponseModel } from '../model/RegisterReponseModel';

declare var $: (arg0: any) => { (): any; new(): any; modal: { (arg0: string): void; new(): any; }; };
@Component({
  selector: 'app-roomdetails',
  templateUrl: './roomdetails.component.html',
  styleUrls: ['./roomdetails.component.css']
})
export class RoomdetailsComponent implements OnInit {

  listOfRoomInfo:RoomInfoDTO[];
  addRoomForm:FormGroup | any;
  roomInfoDTOObj:RoomInfoDTO;
  submitted = false;
  errorMessage: any;
  addDetails:AddDetails;
  listOfRoomType:roomType[];

  @ViewChild('someModal') someModal:ElementRef; 
  constructor(private roomerviceServiceObj:RoomerviceService,private router:Router, private route:ActivatedRoute) { 

   this.addDetails=new AddDetails();
    this.roomInfoDTOObj=new RoomInfoDTO();
  }
  ngOnInit(): void {
    this.getAllRoom();
    this.addRoomForm=new FormGroup({
     
      roomNumber:new FormControl('',[Validators.required]),
      selectRoomType:new FormControl('',[Validators.required]),
     
    });
  }
  getAllRoom() {
    this.roomerviceServiceObj.getAllRoom().subscribe(res => this.listOfRoomInfo = res, error => this.errorMessage = <any>error);
  }

  getAllRoomType() {
    this.roomerviceServiceObj.findAllRoomType().subscribe(res => this.listOfRoomType = res, error => this.errorMessage = <any>error);
  }
  get f(): { [key: string]: AbstractControl } {
    return this.addRoomForm.controls;
  }

  openModel()
  {

    this.getAllRoomType();
    $(this.someModal.nativeElement).modal('show'); 
  }

  deleteRoom(id:number)
   {
  
    this.roomerviceServiceObj.deleteRoom(id).subscribe((response: any) => {
     
       if(response==true)    
       {
         $(this.someModal.nativeElement).modal('hide'); 
         this.getAllRoom();
         this.router.navigateByUrl('/roomDetails')
         
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
   save()
   {
  
   this.addDetails.rTypes=this.addRoomForm.get("selectRoomType").value;
   this.addDetails.roomNumber=this.addRoomForm.get("roomNumber").value;
   this.roomerviceServiceObj.addRoomNumber(this.addDetails).subscribe((response: RegisterReponseModel) => {
    if(response.result==true)    
     {
       $(this.someModal.nativeElement).modal('hide'); 
       this.getAllRoom();
       this.router.navigateByUrl('/roomDetails')
       
     } 
     else
     {
      alert(response.message);
     }
   },
      (  error: any) => {
    console.log(error);
   });
    
   }

}
