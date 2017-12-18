import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { CognitoUtil } from './register/cognito.service';

@NgModule({
  declarations: [AppComponent, RegisterComponent],
  imports: [BrowserModule, FormsModule],
  providers: [CognitoUtil],
  bootstrap: [AppComponent]
})
export class AppModule {}
