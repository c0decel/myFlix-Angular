import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DetailsComponent } from '../details/details.component';
import { MatSnackBar } from '@angular/material/snack-bar';

type User = { _id?: string, Username?: string, Pass?: string, Email?: string, Birthdate?: string, FavoriteMovies?: [] }

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    const user = localStorage.getItem('user');

    if (!user) {
      this.router.navigate(['welcome']);
      return;
    }

    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  getGenre(name: string, description: string): void {
    this.dialog.open(DetailsComponent, {
      data: {
        title: name,
        content: description
      },
      width: '500px'
    })
  }

  getDirector(name: string, bio: string): void {
    this.dialog.open(DetailsComponent, {
      data: {
        title: name,
        content: bio
      },
      width: '500px'
    })
  }

  getDetails(title: string, description: string): void {
    this.dialog.open(DetailsComponent, {
      data: {
        title: title,
        content: description
      },
      width: '500px'
    })
  }

  navProfile(): void {
    this.router.navigate(['profile']);
  }

  logOut(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    this.router.navigate(['welcome']);
  }

  isFavorite(MovieID: string): boolean {
    return this.fetchApiData.isFavoriteMovie(MovieID)
  }

  toggleFavorite(MovieId: string): void {
  if (this.isFavorite(MovieId)) {
    this.removeFavorite(MovieId);
  } else {
    this.addFavorite(MovieId);
  }
}

  addFavorite(MovieID: string): void {
    this.fetchApiData.addFavoriteMovie(MovieID).subscribe(() => {
      this.dialog.open(DetailsComponent, {
        data: {
          content: 'Added to favorites'
        },
        width: '500px'
      })
    });
  }

  removeFavorite(MovieID: string): void {
    this.fetchApiData.removeFavoriteMovie(MovieID).subscribe(() => {
      this.dialog.open(DetailsComponent, {
        data: {
          content: 'Removed from favorites'
        },
        width: '500px'
      })
    });
  }
}
