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
