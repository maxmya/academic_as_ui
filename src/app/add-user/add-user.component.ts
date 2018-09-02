import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {NgForm} from '@angular/forms';
import {User} from '../models/User';
import {Response} from '../models/Response';
import {catchError, map} from 'rxjs/operators';
import {Admin} from '../models/Admin';
import {Professor} from '../models/Professor';
import {Assistant} from '../models/Assistant';
import {Student} from '../models/Student';
import {Supervisor} from '../models/Supervisor';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  baseUrl: string;
  error: string;
  err: Boolean = false;
  success: Boolean = false;
  role: String = 'User Role';
  roleSelected: Boolean = false;

  constructor(public http: HttpClient) {
  }

  ngOnInit() {
  }

  private handleError(error: HttpErrorResponse) {
    this.success = false;
    this.err = true;
    this.error = error.message;
    return throwError(error.message);
  };

  selectRole(role: String) {
    this.role = role;
    this.roleSelected = true;
  }

  static isUserEmpty(user: User) {
    return !(user.username && user.firstName && user.lastName && user.email && user.password);
  }

  onSubmit(form: NgForm) {

    const formValues = Object.assign({}, form.value);

    // this line is to ignore that user object should have id attribute
    // it's auto generated from the backend
    // @ts-ignore
    const formUser: User = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      username: formValues.username,
      password: formValues.password
    };
    if (AddUserComponent.isUserEmpty(formUser)) {
      this.success = false;
      this.err = true;
      this.error = 'please complete missing fields';
      return;
    }
    if (!this.roleSelected) {
      this.success = false;
      this.err = true;
      this.error = 'please select role';
      return;
    }

    let sentObj = {};
    switch (this.role) {
      case 'Admin': {
        // @ts-ignore
        const admin: Admin = {user: formUser};
        sentObj = admin;
        this.baseUrl = 'http://localhost:8080/register/admin';
        break;
      }
      case 'Professor': {
        // @ts-ignore
        const professor: Professor = {user: formUser};
        sentObj = professor;
        this.baseUrl = 'http://localhost:8080/register/professor';
        break;
      }
      case 'Assistant': {
        // @ts-ignore
        const assistant: Assistant = {user: formUser};
        sentObj = assistant;
        this.baseUrl = 'http://localhost:8080/register/assistant';
        break;
      }
      case 'Student': {
        // @ts-ignore
        const student: Student = {user: formUser};
        sentObj = student;
        this.baseUrl = 'http://localhost:8080/register/student';
        break;
      }
      case 'Supervisor': {
        // @ts-ignore
        const supervisor: Supervisor = {user: formUser};
        sentObj = supervisor;
        this.baseUrl = 'http://localhost:8080/register/supervisor';
        break;
      }
    }


    if (formValues.password != formValues.cnfpassword) {
      this.err = true;
      this.error = 'password not matching';
      return;
    }


    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    this.http.post<any>(this.baseUrl, sentObj, httpOptions)
      .pipe(catchError((err, caught) => this.handleError(err)))
      .subscribe(res => {
        if (res.code == '200') {
          form.reset();
          this.err = false;
          this.success = true;
        } else {
          this.success = false;
          this.error = res.message;
        }
      });

  }


}
