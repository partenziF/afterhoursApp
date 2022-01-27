// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'afterhours-b8f4b',
    appId: '1:1045222488164:web:b5f1a5ff3ef8c6b0384771',
    storageBucket: 'afterhours-b8f4b.appspot.com',
    apiKey: 'AIzaSyC12SFnqFnh4hI-HCSpzSGrVeHfwKDrjHA',
    authDomain: 'afterhours-b8f4b.firebaseapp.com',
    messagingSenderId: '1045222488164',
    measurementId: 'G-7PMDMF7E8R',
  },
  production: false,
  baseURL: {
    base: 'https://us-central1-afterhours-b8f4b.cloudfunctions.net',
    Login: 'https://us-central1-afterhours-b8f4b.cloudfunctions.net/login',
    UserInfo: 'https://us-central1-afterhours-b8f4b.cloudfunctions.net/userinfo',
    GetProfile: 'https://us-central1-afterhours-b8f4b.cloudfunctions.net/getprofile',
    RegisterUser: 'https://us-central1-afterhours-b8f4b.cloudfunctions.net/registeruser',
    UploadProfile: 'https://us-central1-afterhours-b8f4b.cloudfunctions.net/uploadprofile',

    Users: 'https://us-central1-afterhours-b8f4b.cloudfunctions.net/users'

  }

};

/*
 * 'http://127.0.0.1:8080'
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
