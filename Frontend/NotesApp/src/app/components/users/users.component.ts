import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { MatDialog } from "@angular/material";
import { NewUserDialogComponent } from "./components/new-user-dialog.component";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {
  users: Array<{ id: number; name: string; notes: Array<string> }>;
  newUser: { name: string };

  constructor(private apiService: ApiService, public dialog: MatDialog) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.users = this.apiService.getUsers();
  }

  saveNewUser() {
    this.apiService.addUser(this.newUser);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewUserDialogComponent, {
      width: "250px",
      data: { quiz: this.newUser }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.newUser = {
          name: result.name
        };
        this.saveNewUser();
      }
    });
  }
}
