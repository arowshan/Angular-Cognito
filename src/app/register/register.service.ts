import { Inject, Injectable } from '@angular/core';
import { CognitoUtil } from './cognito.service';
import { RegistrationUser } from './register.component';
import { CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';

@Injectable()
export class RegisterService {
  constructor(@Inject(CognitoUtil) public cognitoUtil: CognitoUtil) {}

  register(user: RegistrationUser): void {
    const attributeList = [];

    const dataEmail = {
      Name: 'email',
      Value: user.email
    };
    const dataNickname = {
      Name: 'nickname',
      Value: user.name
    };
    attributeList.push(new CognitoUserAttribute(dataEmail));
    attributeList.push(new CognitoUserAttribute(dataNickname));

    this.cognitoUtil
      .getUserPool()
      .signUp(user.email, user.password, attributeList, null, function(
        err,
        result
      ) {
        // if (err) {
        //   callback.cognitoCallback(err.message, null);
        // } else {
        //   callback.cognitoCallback(null, result);
        // }
      });
  }


  confirmRegistration(username: string, confirmationCode: string): void {
      let userData = {
          Username: username,
          Pool: this.cognitoUtil.getUserPool()
      };

      let cognitoUser = new CognitoUser(userData);

      cognitoUser.confirmRegistration(confirmationCode, true, function (err, result) {
          // if (err) {
          //     callback.cognitoCallback(err.message, null);
          // } else {
          //     callback.cognitoCallback(null, result);
          // }
      });
  }


}
