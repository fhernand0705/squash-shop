import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';



@NgModule({
  declarations: [
    NavbarComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class CoreModule { }
