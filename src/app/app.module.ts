import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { CognitoUtil } from './register/cognito.service';
import { ConfirmRegistrationComponent } from './confirm-registration/confirm-registration.component';
import { RegisterService } from './register/register.service';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';

@NgModule({
  declarations: [AppComponent, RegisterComponent, ConfirmRegistrationComponent, LoginComponent],
  imports: [BrowserModule, FormsModule],
  providers: [CognitoUtil, RegisterService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
