import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register/register.service';

@Component({
  selector: 'app-confirm-registration',
  templateUrl: './confirm-registration.component.html',
  styleUrls: ['./confirm-registration.component.css']
})
export class ConfirmRegistrationComponent implements OnInit {

  confirmationCode: string;
  email: string;

  constructor( public registerService: RegisterService ) { }

  ngOnInit() {
  }

  onConfirmRegistration() {
    this.registerService.confirmRegistration(this.email, this.confirmationCode);
  }

}
