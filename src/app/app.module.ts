import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';

import { MaterialModule } from '../material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';


import { UserListViewComponent } from './user-list-view/user-list-view.component';
import { UserDetailDialogComponent} from './user-detail-dialog/user-detail-dialog.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { RegisterComponent } from './register/register.component';
import { UploadProfileComponent } from './upload-profile/upload-profile.component';



//import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
//import { FormBuilder, Validators, FormGroup } from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent,
    UserListViewComponent,
    UserDetailDialogComponent,
    
    EditUserComponent,
          FileUploadComponent,
          DashboardComponent,
          RegisterComponent,
          UploadProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatNativeDateModule,
    MatDialogModule,
    MaterialModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
  ],

  entryComponents: [UserDetailDialogComponent, EditUserComponent],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
