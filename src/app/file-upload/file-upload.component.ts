import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';

import { UserService } from '../user.service';
import { Profile } from '../profile';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  @Input() ID!: string;

  @Output() stateChanged = new EventEmitter<Profile>();

  currentFile?: File;
  progress = 0;
  message = '';

  fileName = 'Select File';
  fileInfos?: Observable<Profile>;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.fileInfos = this.userService.getProfile(this.ID);
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

    if (this.currentFile) {

      this.userService.uploadProfile(this.ID, this.currentFile).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {

            if (event.status == 200) {
              this.message = "File uploaded!"
              this.fileInfos = event.body;
              var profile: Profile = event.body;
              this.stateChanged.emit(profile);
            } else {
              this.message = "Error file not uploaded";
              this.fileInfos = undefined;
            }
          }
        },
        (err: any) => {
          console.log(err);

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
