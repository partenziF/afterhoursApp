// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const baseURL = 'https://<ZONEID>-<PROJECTID>.cloudfunctions.net'

export const environment = {
  firebase: {
    projectId: '<PROJECTID>',
    appId: '<APPID>',
    storageBucket: '<STORAGEBUCKET>',
    apiKey: '<APIKEY>',
    authDomain: '<AuTHDOMAIN>',
    messagingSenderId: '',
    measurementId: '',
  },
  production: false,
  baseURL: {
    
    Login: `${baseURL}/login`,
    UserInfo: `${baseURL}/userinfo`,
    GetProfile: `${baseURL}/getprofile`,
    RegisterUser: `${baseURL}/registeruser`,
    UploadProfile: `${baseURL}/uploadprofile`,

    Users: `${baseURL}/users`

  }

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
