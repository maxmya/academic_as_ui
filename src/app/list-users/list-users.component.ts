import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Admin} from '../models/Admin';
import {Professor} from '../models/Professor';
import {Assistant} from '../models/Assistant';
import {Student} from '../models/Student';
import {Supervisor} from '../models/Supervisor';
import {throwError} from 'rxjs';
import {UsersResponse} from '../models/UsersResponse';
import {forEach} from '@angular/router/src/utils/collection';
import {User} from '../models/User';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  baseUrl: string = 'http://localhost:8080/users/admins';
  updateUrl: string = 'http://localhost:8080/update/admin/';

  error: string;
  err: Boolean = false;
  success: Boolean = false;
  users = new Array<Admin>();

  dialogFirstName: String;
  dialogSecondName: String;
  dialogUserName: String;
  dialogUserEmail: String;
  currentAdminId: number;

  constructor(public http: HttpClient) {
    this.http.get<UsersResponse>(this.baseUrl)
      .subscribe((res: UsersResponse) => {
        res.data.forEach((admin: Admin) => {
          this.users.push(admin);
        });
      });
  }

  editAccount(id: number) {
    this.users.forEach(admin => {
      if (id == admin.id) {
        this.dialogFirstName = admin.user.firstName;
        this.dialogSecondName = admin.user.lastName;
        this.dialogUserName = admin.user.username;
        this.dialogUserEmail = admin.user.email;
        this.currentAdminId = admin.id;
      }
    });
  }

  putUpdate() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    // @ts-ignore
    const updatedUser: User = {
      firstName: this.dialogFirstName,
      lastName: this.dialogFirstName,
      email: this.dialogFirstName,
      username: this.dialogFirstName,
    };
    // @ts-ignore
    const updatedAdmin: Admin = {user: updatedUser};

    this.http.put<any>(this.updateUrl + this.currentAdminId, updatedAdmin, httpOptions)
      .pipe(catchError((err, caught) => this.handleError(err)))
      .subscribe(res => {
        if (res.code == '200') {
          this.err = false;
          this.success = true;
        } else {
          this.success = false;
          this.error = res.message;
        }
      });
  }

  private handleError(error: HttpErrorResponse) {
    this.success = false;
    this.err = true;
    this.error = error.message;
    return throwError(error.message);
  };

  ngOnInit(): void {
  }

}

