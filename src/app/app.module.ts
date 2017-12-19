import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { CognitoUtil } from './register/cognito.service';
import { ConfirmRegistrationComponent } from './confirm-registration/confirm-registration.component';
import { RegisterService } from './register/register.service';

@NgModule({
  declarations: [AppComponent, RegisterComponent, ConfirmRegistrationComponent],
  imports: [BrowserModule, FormsModule],
  providers: [CognitoUtil, RegisterService],
  bootstrap: [AppComponent]
})
export class AppModule {}
