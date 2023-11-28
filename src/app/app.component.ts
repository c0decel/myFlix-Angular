import { Component } from '@angular/core';
import { UserRegFormComponent } from './user-reg-form/user-reg-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myFlix-Angular-client';

  constructor(public dialog: MatDialog) { }

  openUserRegDialog(): void {
    this.dialog.open(UserRegFormComponent, {
      width: '280px'
    })
  }

  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
    width: '280px'
    })
  }
}
