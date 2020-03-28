import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material";
import { Observable } from "rxjs";
import { ApiService } from "src/app/services/api.service";
import { DeleteUserDialogComponent } from "./delete-user-dialog.component";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.sass"]
})
export class UserComponent implements OnInit {
  routeId: number;
  user$: Observable<{ id: number; name: string; notes: Array<any> }>;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.user$ = this.apiService.getUserById(this.routeId);
  }
  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      data: { user$: this.user$ }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiService.deleteUserById(this.routeId);
      }
    });
  }
}