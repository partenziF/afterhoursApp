import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Profile } from '../profile';
import { User } from '../user';
import { UserService } from '../user.service';


@Component({
  selector: 'app-user-detail-dialog',
  templateUrl: './user-detail-dialog.component.html',
  styleUrls: ['./user-detail-dialog.component.css']
})
export class UserDetailDialogComponent implements OnInit {

  public profile!: Profile;
  public loadingImage!: boolean;
  

  constructor(private userService: UserService, @Inject(MAT_DIALOG_DATA) public data: User) {
    this.loadingImage = true;
  }

  ngOnInit(): void {

    this.userService.getProfile(this.data.ID).subscribe(x => this.profile = x, error => console.error(error.error), () => this.loadingImage = false);

  }

}

