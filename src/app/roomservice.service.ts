import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs-compat/Observable';
import { BookedDetails } from './BookedDetails';
import { roomType } from './room/roomType';
import { roomDetails } from './room/room.details';
import { RoomInfoDTO } from './roomdetails/RoomInfoDTO';
import { AddDetails } from './roomdetails/AddDetails';
import { BookedInfo } from './room/BookedDetails';
import { SearchBookResult } from './room/SearchBookResult';

@Injectable({
  providedIn: 'root'
})
export class RoomerviceService {
  
private url:string='';
private status:string='';
headers={
  headers: new HttpHeaders({
      'Content-Type': 'application/json'
  })
}
  constructor(private http:HttpClient) {
    this.url="http://localhost:81";
   }
   public findAllRoomType():Observable<roomType[]>
   {
     return this.http.get<roomType []>(this.url+"/rbs/allRoomType");
   }
   public bookRooms(objRoom:BookedDetails):Observable<roomDetails[]>
   {
    return this.http.post<roomDetails[]>(this.url+"/addBookDetails",objRoom);
   }
   public addRoomInfo(roomTypeObj: roomType) {
    return this.http.post<any>(this.url+"/rbs/addRoomType",roomTypeObj);
  }
  deleteRoomType(roomTypeId: number) {
    return this.http.delete<any>(this.url+"/rbs/deleteRoomType/" + roomTypeId);
  }

  getAllRoom():Observable<RoomInfoDTO[]> {
    return this.http.get<RoomInfoDTO[]>(this.url+"/allRoom");
    
  }
  addRoomNumber(addDetails: AddDetails) {
    return this.http.post<any>(this.url+"/addRoom",addDetails);
  }

  deleteRoom(roomId: number) {
    return this.http.delete<any>(this.url+"/deleteRoom/" + roomId);
  }
  
  searchRoom(bookedInfo: BookedInfo):Observable<SearchBookResult[]> {
    return this.http.post<SearchBookResult[]>(this.url+"/searchRoom",bookedInfo);
  }
  bookSearchedRoom(bookedInfo: BookedInfo) :Observable<SearchBookResult[]> {
    return this.http.post<SearchBookResult[]>(this.url+"/bookDetails",bookedInfo);
  }
 
}
