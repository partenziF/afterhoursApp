import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginRequest } from '../LoginRequest';
import { UserService } from '../user.service';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { environment } from '../../environments/environment';

import { AuthorizationRequest } from '../AuthorizationRequest';
import { User } from '../user';
import { Profile } from '../profile';
import { MatDialogRef } from '@angular/material/dialog';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { finalize } from 'rxjs/operators';


const app = initializeApp(environment.firebase);
const auth = getAuth();


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public form!: FormGroup;
  public loading: boolean = false;
  public imageFound: boolean = false;

  public IdToken: string = "";
  public currentUser: User = { ID: "", Email: "", FirstName: "", LastName: "", Nickname: "" }
  public currentProfile: Profile | undefined;

  public formRegister!: FormGroup;

  public showEditor: boolean = false;
  public errorMessage: string = "";

  constructor(private fb: FormBuilder, private userService: UserService) {

    this.form = fb.group({
      Email: ["", [Validators.required, Validators.email]],
    });

  }

  ngOnInit(): void {
  }

  onUserInfo(): void {

    this.loading = true;
    const request: AuthorizationRequest = {
      AuthToken: this.IdToken
    }
    this.loadUserInfo(request.AuthToken);

  }

  onRegister(): void {
    this.currentUser.LastName = "prova";
  }

  loadUserInfo(idToken: string): void {

    this.currentProfile = undefined;
    this.currentUser.ID = '';

    this.loading = true;
    this.imageFound = false;
    const request: AuthorizationRequest = {
      AuthToken: idToken
    }
    this.userService.userInfo(request).subscribe(u => {
      this.currentUser = u;
      //console.log(u);
      this.userService.getUserProfile(request).pipe(
        finalize(() => {
          this.loading = false;
        })
      ).subscribe(p => {
        this.currentProfile = p;
        this.imageFound = true;
      }
        , errorResponse => {
          if (errorResponse.status == 404) {
            this.imageFound = false;
          } else {
            console.log(errorResponse);
            this.imageFound = false;
          }

        }

        , () => this.loading = false)
    }
      , err => { this.loading = false }

    );

  }

  onShowEditor(): void {
    this.showEditor = true;
  }

  onShowCard(event: any): void {
    this.showEditor = false;
    this.loadUserInfo(this.IdToken);
  }

  onLogin(): void {

    this.loading = true;
    this.IdToken = "";
    this.errorMessage = "";

    this.userService.login(this.form.value).subscribe(loginResponse => {

      if (loginResponse == undefined) {
        this.loading = false;
        this.errorMessage = "Login error";
        return;
      }
      signInWithCustomToken(auth, loginResponse.AuthToken)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;

          userCredential.user.getIdToken().then(idToken => {
            this.IdToken = idToken;
            this.loadUserInfo(idToken)
          });


        })
        .catch((error) => {
          
          this.errorMessage = error.message;
          this.loading = false;
          console.log(error.code + ' ' + error.message);

        });

    }, () => this.loading = false);
  }

}
