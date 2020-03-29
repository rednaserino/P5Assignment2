import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  apiPath = environment.apiBaseUrl;
  users: Array<{ id: number; name: string }> = [];

  constructor(private http: HttpClient) {}

  getUsers(): Observable<Array<{ id: number; name: string }>> {
    return this.http.get(`${this.apiPath}/users`) as Observable<
      Array<{ id: number; name: string }>
    >;
  }

  getUserById(
    id: number
  ): Observable<{ id: number; name: string; notes: Array<any> }> {
    return new Observable(subscriber => {
      subscriber.next({
        id: 1,
        name: "Susan",
        notes: [
          "Take a walk",
          "X-marks the spot",
          "The square roots of 16 are 4 & -4"
        ]
      });
      subscriber.complete();
    });
  }

  getNotesByUserName(name: string) {
    return this.http.get(`${this.apiPath}/notes?name=${name}`);
  }

  deleteUserById(id: number): void {
    // let delete$ = this.http.delete(`${this.usersApiPath}/${id}`);
    // delete$.subscribe(r => {
    //   console.log(r);
    //   this.router.navigateByUrl('/users');
    // });
  }

  addUser(user: { name: string }) {}
  addNote(note: string) {}
}
