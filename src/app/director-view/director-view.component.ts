import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-director-view',
  templateUrl: './director-view.component.html',
  styleUrls: ['./director-view.component.scss']
})
export class DirectorViewComponent implements OnInit {

  constructor(
    // Injects data from MovieCardComponent into DirectorCardComponent using the MAT_DIALOG_DATA injection token.
    // The data becomes a property on the class and is available to be output in the template.
    @Inject(MAT_DIALOG_DATA)
    public data: {
      name: string,
      bio: string,
      birth: string,
    }
  ) { }

  ngOnInit(): void {
  }

}
