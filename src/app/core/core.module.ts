
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user/user.service';

@NgModule({
  declarations: [

  ],
  imports: [
    HttpClientModule,
    CommonModule
  ],
  exports:[
  ],
  providers: [
    AuthService,
    UserService
  ]
})
export class CoreModule { }
