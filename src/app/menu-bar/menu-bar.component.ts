import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';


@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialogModule,
    public menuModule: MatMenuModule
  ) { }

  ngOnInit(): void {
  }

  // directs user to movies page and profile page
  toMovies(): void {
    this.router.navigate(['movies']);
  }
  toProfilePage(): void {
    this.router.navigate(['profile']);
  }
  // logs a user out
  logOut(): void {
    localStorage.clear();
    this.snackBar.open('You have been successfully logged out', 'Ok', {
      duration: 2000,
      verticalPosition: 'top'
    });
    this.router.navigate(['welcome']);
  }

}
