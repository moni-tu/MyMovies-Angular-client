import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
//import components
import { DirectorViewComponent } from '../director-view/director-view.component';
import { FetchApiDataService } from '../fetch-api-data.service';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { SynopsisViewComponent } from '../synopsis-view/synopsis-view.component';
/* import { UserEditComponent } from '../user-edit/user-edit.component'; */

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {
  user: any = {};
  Username: any = localStorage.getItem('user');
  movies: any[] = [];
  Favorites: any[] = [];
  displayElement: boolean = false

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getProfile();
    this.getFavoriteMovies();
  }

  // get user profile info
  getProfile(): void {
    const Username = localStorage.getItem('user');
    console.log(Username);
    if (Username) {
      // getUserProfile() is in fetchapidataservice.ts
      this.fetchApiData.getUserProfile().subscribe((resp: any) => {
        this.user = resp;
        console.log(this.user);
        return this.user;
      });
    }
  }

  getFavoriteMovies(): void {
    const Username = localStorage.getItem('user');
    console.log(Username);
    if (Username) {
      this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        this.movies = resp;
        console.log(this.movies);
        this.movies.forEach((movie: any) => {
          if (this.user.Favorites.includes(movie._id)) {
            this.Favorites.push(movie);
          }
        });
        console.log(this.Favorites);
      });
      console.log(this.Favorites);
    } 
  } 

  // delete favorite movie
  deleteFavoriteMovie(_id: string): void {
    // deleteFavoriteMovie is in fetchapi dataservice
    this.fetchApiData.deleteFavoriteMovie(_id).subscribe((res: any) => {
      this.snackBar.open(`Successfully removed ${_id} from favorite movies.`, 'OK', {
        duration: 4000, verticalPosition: 'top'
      });
      setTimeout(function () {
        window.location.reload();
      }, 4000);
    });
  }

  // user gets director details
  getDirector(name: string, bio: string, birth: string): void {
    this.dialog.open(DirectorViewComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
      },
      width: '500px',
      panelClass: 'director-custom'
    });
  }

  // user gets genre details
  getGenre (name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '500px',
      panelClass: 'genre-custom'
    });
    console.log('Name: ' + name)
  }

  getSynopsis( imagePath: any, description: string): void {
    this.dialog.open(SynopsisViewComponent, {
      data: {
        ImagePath: imagePath,
        Description: description,
      },
      width: '500px',
      panelClass: 'synopsis-custom'
    });
  }

  //edit user info
  /* openEditUserProfile(): void {
    this.dialog.open(UserEditComponent, {
      width: '500px',
      panelClass: 'edit-user-custom',
    });
  } */

  deleteUserProfile(): void {
    if (confirm('Are your sure you want to delete your account? This can\'t be undone.')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('Your account has been deleted', 'OK', {
          duration: 6000,
          verticalPosition: 'top'
        });
      });
      this.router.navigate(['welcome'])
      this.fetchApiData.deleteUserProfile().subscribe(() => {
        localStorage.clear();
      });
    }
  }

}
