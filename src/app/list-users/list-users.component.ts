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

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  baseUrl: string = 'http://localhost:8080/users/admins';
  error: string;
  err: Boolean = false;
  success: Boolean = false;
  test: String;
  users = new Array();

  constructor(public http: HttpClient) {
    this.http.get<UsersResponse>(this.baseUrl)
      .subscribe((res: UsersResponse) => {
        res.data.forEach((admin: Admin) => {
          this.users.push(admin.user);
        });
      });
  }

  editAccount(id) {

  }

  private handleError(error: HttpErrorResponse) {
    this.success = false;
    this.err = true;
    this.error = error.message;
    return throwError(error.message);
  };


  ngOnInit() {
  }


}
