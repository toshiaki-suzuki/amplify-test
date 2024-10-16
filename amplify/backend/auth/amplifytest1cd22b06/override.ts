import { AmplifyAuthCognitoStackTemplate } from '@aws-amplify/cli-extensibility-helper';

export function override(resources: AmplifyAuthCognitoStackTemplate) {
  resources.userPool.policies = { // Set the user pool policies
    passwordPolicy: {
      ...resources.userPool.policies["passwordPolicy"], // Carry over existing settings
      temporaryPasswordValidityDays: 6 // Add new setting not provided Amplify's default
    }
  }
  // ユーザープールにアプリケーションクライアントを追加
  resources.addCfnResource({
    type: 'AWS::Cognito::UserPoolClient',
    properties: {
      UserPoolId: resources.userPool.ref,
      ClientName: 'myappclient',
      GenerateSecret: false,
      RefreshTokenValidity: 30,
      AllowedOAuthFlows: ['code'],
      AllowedOAuthFlowsUserPoolClient: true,
      AllowedOAuthScopes: ['email', 'openid', 'profile'],
      CallbackURLs: ['http://localhost:3000'],
      LogoutURLs: ['http://localhost:3000'],
      SupportedIdentityProviders: ['COGNITO'],
    }
  }, 'myappClient');
}
