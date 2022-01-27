import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

import { User } from '../user';
import { UserService } from '../user.service';
import { Profile } from '../profile';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  public form!: FormGroup;
  public ID!: string;

  public profile!: Profile;
  public loadingImage!: boolean;

  public loading!: boolean;


  constructor(private fb: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User) {

    this.ID = data.ID;
    this.form = fb.group({
      Email: [data.Email, [Validators.required, Validators.email]],
      FirstName: [data.FirstName,],
      LastName: [data.LastName,],
      Nickname: [data.Nickname,],
    });


  }

  ngOnInit(): void {
    if (this.data.ID)
      this.userService.getProfile(this.data.ID).subscribe(x => this.profile = x, error => console.error(error.error), () => this.loadingImage = false);

  }


  onSave(): void {

    this.loading = true;

    if (this.ID != undefined) {
      //this.userService.update(this.ID, this.form.value).subscribe(response => {
      //  console.log(response);
        
      //}, (err: any) => {
      //  console.log(err);
      //  this.loading = false;
      //},
      //  () => { this.loading= false; }
      //);
      this.userService.update(this.ID, this.form.value).subscribe(
        user => {
          if (user) this.dialogRef.close(user);
        },
        error => {
                    
        },
        () => this.loading = false);
    } else {
      this.userService.create(this.form.value).pipe(
        finalize(() => {
          this.loading = false;
        })
      ).subscribe(
        x => this.dialogRef.close(x),
        errorResponse => {
          if (errorResponse.status == 400) {
            this.form.get("Email")?.setErrors({ serverError: errorResponse.error })
          } else {
            console.log(errorResponse);
            this.form.get("Email")?.setErrors({ serverError: errorResponse.error })
          }
          
        },
        () => this.loading = false
      );
    }


  }


  onStateChange(event: Profile): void {
    this.profile = event;
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
