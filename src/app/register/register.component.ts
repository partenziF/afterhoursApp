import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthorizationRequest } from '../AuthorizationRequest';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Input() data!: User;

  @Input() tokenId!: string;

  @Output() closeEditor = new EventEmitter<any>();

  public message: string = ""; 
  public form!: FormGroup;
  public loadingRegister: boolean = false;

  constructor(private fb: FormBuilder,
    private userService: UserService) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      Email: [this.data.Email,],
      FirstName: [this.data.FirstName,],
      LastName: [this.data.LastName,],
      Nickname: [this.data.Nickname,],
    });
  }

  onRegister(): void {

    this.loadingRegister = true;

    if (this.tokenId != undefined) {

      const request: AuthorizationRequest = { AuthToken: this.tokenId }

      this.userService.registerUser(request, this.form.value).subscribe(x => { this.message = "Data saved"; },
        error => {
          this.message = "Error data not saved";
          this.loadingRegister = false;
        },
        () => this.loadingRegister = false);
    }


  }

  onClose(): void {
    this.closeEditor.emit(null);
  }


}
