import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {AddUserComponent} from './add-user/add-user.component';

const routes: Routes = [
  {path: 'add', component: AddUserComponent}

  ];

@NgModule({
  imports: [
    CommonModule, RouterModule.forRoot(routes)

  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {
}
