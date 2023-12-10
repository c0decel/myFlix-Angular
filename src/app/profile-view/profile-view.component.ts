import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

type User = { _id?: string, Username?: string, Pass?: string, Email?: string, Birthdate?: string, FavoriteMovies?: [] }

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {
  user: User = {};
  favoriteMovies: any[] = [];

  @Input() userData = { Username: '', Pass: '', Email: '', Birthdate: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router) { }

  ngOnInit(): void {
    const user = this.getUser();

    if (!user._id) {
      this.router.navigate(['welcome']);
      return;
    }

    this.user = user;
    this.userData = {
      Username: user.Username || "",
      Email: user.Email || "",
      Birthdate: user.Birthdate || "",
      Pass: ""
    }

    // Load favorite movies
    this.getFavoriteMovies();
  }

  /**
   * @returns user information
   */
  getUser(): User {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  /**
   * Gets a list of user's favorites
   */
  getFavoriteMovies(): void {
    this.fetchApiData.getFavoriteMovies().subscribe((movies: any) => {
      this.favoriteMovies = movies;
    });
  }

  /**
   * Updates user's account information
   */
  updateUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result))
      this.user = result;
    });
  }

  goBack(): void {
    this.router.navigate(['movies']);
  }

  logOut(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['welcome']);
  }
}
