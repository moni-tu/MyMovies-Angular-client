import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
// import app components
import { SynopsisViewComponent } from '../synopsis-view/synopsis-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { GenreViewComponent } from '../genre-view/genre-view.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  movies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog, 
    public snackBar: MatSnackBar,
    /* public router: Router */
    ) { }

  // ngOnInit methos has the same logic as component did mount in React (gets called aferwards)
  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }
  // opens synopsis view
  getSynopsis(title: string, imagePath: any, description: string): void {
    this.dialog.open(SynopsisViewComponent, {
      data: {
        title: title,
        imagePath: imagePath,
        description: description,
      },
      width: '500px'
     });
    }
  
  // opens director view
  getDirector(name: string, bio: string, birth: string): void {
    this.dialog.open(DirectorViewComponent, {
      data: {
        name: name,
        bio: bio,
        birth: birth,
      },
      width: '500px'
    });
  }
  // opens genre view
  getGenre(name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      data: {
        name: name,
        description: description
      },
      width: '500px'
    });
  }

  addToFavorites(_id: string): void {
    console.log(_id);
    const token = localStorage.getItem('token');
    console.log(token)
    this.fetchApiData.addFavoriteMovie(_id).subscribe((res: any) => {
      this.snackBar.open(`Successfully added ${_id} to favorite movies.`, 'OK', {
        duration: 4000,
        verticalPosition: 'top'
      });
      console.log(res)
      this.ngOnInit();
    });
  }
}
