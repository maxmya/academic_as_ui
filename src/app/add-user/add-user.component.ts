import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {NgForm} from '@angular/forms';
import {User} from '../models/User';
import {Response} from '../models/Response';
import {catchError, map} from 'rxjs/operators';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  newUser: User;
  baseUrl: string = 'http://localhost:8080/register/user';
  error: string;
  err: Boolean = false;
  success: Boolean = false;

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

  onSubmit(form: NgForm) {
    const formValues = Object.assign({}, form.value);
    const user: User = {
      firstName: formValues.firstName,
      lastName: formValues.secondName,
      email: formValues.email,
      username: formValues.username,
      password: formValues.password
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    if (formValues.password != formValues.cnfpassword) {
      this.err = true;
      this.error = 'password not matching';
      return;
    }

    this.http.post<Response>(this.baseUrl, user, httpOptions)
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
