import { Component, OnInit } from '@angular/core';

import { RegisterService } from './register.service';

export class RegistrationUser {
  name: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationUser: RegistrationUser;
  constructor(public registerService: RegisterService) {}

  ngOnInit() {
    this.registrationUser = new RegistrationUser();
  }

  onRegister() {
    this.registerService.register(this.registrationUser);
  }
}
