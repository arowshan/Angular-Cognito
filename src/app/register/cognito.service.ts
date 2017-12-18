import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {
  AuthenticationDetails,
  CognitoIdentityServiceProvider,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool
} from 'amazon-cognito-identity-js';
import * as AWS from 'aws-sdk/global';
import * as awsservice from 'aws-sdk/lib/service';
import * as CognitoIdentity from 'aws-sdk/clients/cognitoidentity';

@Injectable()
export class CognitoUtil {
  public static _REGION = environment.region;

  public static _IDENTITY_POOL_ID = environment.identityPoolId;
  public static _USER_POOL_ID = environment.userPoolId;
  public static _CLIENT_ID = environment.clientId;

  public static _POOL_DATA: any = {
    UserPoolId: CognitoUtil._USER_POOL_ID,
    ClientId: CognitoUtil._CLIENT_ID
  };

  public cognitoCreds: AWS.CognitoIdentityCredentials;

  getUserPool() {
    if (environment.cognito_idp_endpoint) {
      CognitoUtil._POOL_DATA.endpoint = environment.cognito_idp_endpoint;
    }
    return new CognitoUserPool(CognitoUtil._POOL_DATA);
  }

  getCurrentUser() {
    return this.getUserPool().getCurrentUser();
  }

  setCognitoCreds(creds: AWS.CognitoIdentityCredentials) {
    this.cognitoCreds = creds;
  }

  getCognitoCreds() {
    return this.cognitoCreds;
  }

  buildCognitoCreds(idTokenJwt: string) {
    let url =
      'cognito-idp.' +
      CognitoUtil._REGION.toLowerCase() +
      '.amazonaws.com/' +
      CognitoUtil._USER_POOL_ID;
    if (environment.cognito_idp_endpoint) {
      url = environment.cognito_idp_endpoint + '/' + CognitoUtil._USER_POOL_ID;
    }
    const logins: CognitoIdentity.LoginsMap = {};
    logins[url] = idTokenJwt;
    const params = {
      IdentityPoolId: CognitoUtil._IDENTITY_POOL_ID /* required */,
      Logins: logins
    };
    const serviceConfigs: awsservice.ServiceConfigurationOptions = {};
    if (environment.cognito_identity_endpoint) {
      serviceConfigs.endpoint = environment.cognito_identity_endpoint;
    }
    const creds = new AWS.CognitoIdentityCredentials(params, serviceConfigs);
    this.setCognitoCreds(creds);
    return creds;
  }

  getCognitoIdentity(): string {
    return this.cognitoCreds.identityId;
  }
}
