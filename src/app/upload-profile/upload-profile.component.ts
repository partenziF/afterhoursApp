import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AuthorizationRequest } from '../AuthorizationRequest';
import { Profile } from '../profile';
import { UserService } from '../user.service';

@Component({
  selector: 'app-upload-profile',
  templateUrl: './upload-profile.component.html',
  styleUrls: ['./upload-profile.component.css']
})
export class UploadProfileComponent implements OnInit {

  @Input() tokenId!: string;

  loading: boolean = false;
  currentFile?: File;
  progress = 0;
  message = '';

  profile!: Profile;
  fileName = 'Select File';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    if (this.tokenId != undefined) {
      this.loading = true;
      const request: AuthorizationRequest = { AuthToken: this.tokenId }
      this.userService.getUserProfile(request).subscribe(p => this.profile = p, err => this.loading = false, () => this.loading = false);
    }
  }


  selectFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.currentFile = file;
      this.fileName = this.currentFile.name;
    } else {
      this.fileName = 'Select File';
    }
  }


  upload(): void {

    this.progress = 0;
    this.message = "";
    this.loading = true;

    if ( (this.tokenId != undefined) && (this.currentFile)) {

      const request: AuthorizationRequest = { AuthToken: this.tokenId }

      this.userService.uploadProfileUser(request, this.currentFile).subscribe(
        (event: any) => {

          this.loading = false;

          if (event.type === HttpEventType.UploadProgress) {

            this.progress = Math.round(100 * event.loaded / event.total);

          } else if (event instanceof HttpResponse) {

            if (event.status == 200) {

              this.message = "File uploaded!"
              
              this.profile = event.body;

            } else {

              this.message = "Error file not uploaded";
              

            }

          }
        },
        (err: any) => {
          console.log(err);
          this.loading = false;
          this.progress = 0;

          if (err.error && err.error.message) {
            this.message = err.error.message;
          } else {
            this.message = 'Could not upload the file!';
          }

          this.currentFile = undefined;
        });

    }

  }

}
