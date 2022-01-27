import { Component, OnInit } from '@angular/core';
import { User } from '../user';


@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.css']
})
export class UserEditorComponent implements OnInit {

  user: User = {
    ID: "1",
    FirstName: "Federica",
    LastName: "Partenzi",
    Email: "federika@libero.it",
    Nickname:"federika78"
  }

  constructor() { }

  ngOnInit(): void {
  }

}
