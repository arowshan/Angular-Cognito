import { Injectable } from '@angular/core';
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import { CognitoUtil } from '../register/cognito.service';
import { STS } from 'aws-sdk';
import { environment } from '../../environments/environment';
import * as AWS from 'aws-sdk';

@Injectable()
export class LoginService {

  constructor(public cognitoUtil: CognitoUtil) { }

  authenticate(username: string, password: string) {

    let authenticationData = {
      Username: username,
      Password: password,
    };
    let authenticationDetails = new AuthenticationDetails(authenticationData);

    let userData = {
      Username: username,
      Pool: this.cognitoUtil.getUserPool()
    };

    let cognitoUser = new CognitoUser(userData);

    var self = this;
    cognitoUser.authenticateUser(authenticationDetails, {
      newPasswordRequired: function (userAttributes, requiredAttributes) {
        // callback.cognitoCallback(`User needs to set password.`, null);
      },
      onSuccess: function (result) {

        let creds = self.cognitoUtil.buildCognitoCreds(result.getIdToken().getJwtToken());

        AWS.config.credentials = creds;

        // So, when CognitoIdentity authenticates a user, it doesn't actually hand us the IdentityID,
        // used by many of our other handlers. This is handled by some sly underhanded calls to AWS Cognito
        // API's by the SDK itself, automatically when the first AWS SDK request is made that requires our
        // security credentials. The identity is then injected directly into the credentials object.
        // If the first SDK call we make wants to use our IdentityID, we have a
        // chicken and egg problem on our hands. We resolve this problem by "priming" the AWS SDK by calling a
        // very innocuous API call that forces this behavior.
        let clientParams: any = {};
        if (environment.sts_endpoint) {
          clientParams.endpoint = environment.sts_endpoint;
        }
        let sts = new STS(clientParams);
        sts.getCallerIdentity(function (err, data) {
          console.log("UserLoginService: Successfully set the AWS credentials");
          // callback.cognitoCallback(null, result);
        });

      },
      onFailure: function (err) {
        // callback.cognitoCallback(err.message, null);
      },
    });
  }

  logout() {
    this.cognitoUtil.getCurrentUser().signOut();
  }

}
