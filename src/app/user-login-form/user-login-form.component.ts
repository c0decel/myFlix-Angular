import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent {
  @Input() loginData = { Username: '', Pass: ''};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router) { }

    ngOnInit(): void {

    }

    loginUser(): void {
      this.fetchApiData.userLogin(this.loginData).subscribe((result) => {
        console.log(result)
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);

        this.dialogRef.close();
        this.snackBar.open(result, 'OK', {
          duration: 2000
        });
        this.router.navigate(['movies']);
      }, (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000
        });
      });
    }
}
