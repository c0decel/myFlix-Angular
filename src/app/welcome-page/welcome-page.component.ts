import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { UserRegFormComponent } from '../user-reg-form/user-reg-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    
  }

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
