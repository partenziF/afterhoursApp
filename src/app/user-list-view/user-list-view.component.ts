import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { UserService } from '../user.service';

import { User } from '../user';
import { UserDetailDialogComponent } from '../user-detail-dialog/user-detail-dialog.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-user-list-view',
  templateUrl: './user-list-view.component.html',
  styleUrls: ['./user-list-view.component.css']
})
export class UserListViewComponent implements OnInit {

  displayedColumns: string[] = ['actions', 'Email', 'FirstName', 'LastName', 'Nickname'];

  users: User[] = [];
  selectedUser?: User;
  public loadingData!: boolean;

  public length = 0;
  public pageSize = 10;
  public pageIndex = 0;
  public pageSizeOptions = [5, 10, 25];
  public showFirstLastButtons = true;

  constructor(private userService: UserService, public dialog: MatDialog) {
    this.loadingData = true;
  }

  getUsers(pageSize: number, pageIndex: number): void {

    this.userService.getUsersResponse(this.pageSize, this.pageIndex)
      .subscribe(response => {

        const keys = response.headers.keys();
        if (keys.indexOf("x-pagination") != -1) {
          this.length = parseInt(response.headers.get("x-pagination")!);

        }

        this.users = [ ...response.body! ]
      }, (err: any) => {
        console.log(err);
        this.loadingData = false;
      },
      () => { this.loadingData = false; }
      )

  }

  ngOnInit(): void {
    this.getUsers(this.pageSize, this.pageIndex);

  }

  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.loadingData = true;
    this.getUsers(event.pageSize, event.pageIndex);

    console.log(event);
  }


  onEdit(user: User, event: any): void {

    event.stopPropagation();
    this.userService.getUser(user.ID).subscribe(usr => {

      const dialogRef = this.dialog.open(EditUserComponent, {
        width: '550px',
        data: user,
        disableClose: true,
        autoFocus: true
      });

      dialogRef.afterClosed().subscribe(result => {
        this.getUsers(this.pageSize, this.pageIndex)
      });

    });


  }

  openDialog(): void {

    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '550px',
      data: {},
      disableClose: true,
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getUsers(this.pageSize, this.pageIndex)
    });
  }


  onSelect(user: User): void {

    this.selectedUser = user;
    var usr: User;

    this.userService.getUser(user.ID).subscribe(usr =>

      this.dialog.open(UserDetailDialogComponent, {
        width: '550px',
        disableClose: true,
        data: usr,
      })

    );

  }

  onDelete(user: User, event: any): void {

    event.stopPropagation();
    if (confirm("Are you sure to delete " + name)) {
      this.userService.delete(user.ID).subscribe(
        (event: any) => {
          if (event != undefined) {
            alert("user " + user.Email + " deleted");
          } else {
            alert("Error")
          }

        },
        (err: any) => {
          console.log(err);
          alert(err.message);

        },
        () => {
          this.getUsers(this.pageSize, this.pageIndex);
        }
      );
    }

  }

}
