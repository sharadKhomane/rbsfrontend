import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RoomComponent } from './room/room.component';
import { RegisterComponent } from './register/register.component';
import { RoomdetailsComponent } from './roomdetails/roomdetails.component';
import { RoomtypeComponent } from './roomtype/roomtype.component';
import { ServicesComponent } from './services/services.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { LoginComponent } from './login/login.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';


const routes: Routes = [ 
  {
  path: '',
  redirectTo: '/home',
  pathMatch: 'full'
  },
  {
  path: 'home',
  component: HomeComponent
  },
  {
    path: 'room',
    component: RoomComponent
    },
    {
      path: 'register',
      component: RegisterComponent
      },
      {
        path: 'roomdetails',
        component: RoomdetailsComponent,
        },
        
      {
        path: 'roomtype',
        component: RoomtypeComponent,
      },
      {
        path: 'services',
        component: ServicesComponent,
      },
      {
        path: 'aboutus',
        component: AboutUsComponent,
      },
      {
        path: 'contactus',
        component: ContactUsComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'adminlogin',
        component: AdminloginComponent,
      },
      {
        path: 'roomDetails',
        component: RoomdetailsComponent,
      },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
