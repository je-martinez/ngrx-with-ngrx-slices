import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private _activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    // this._activatedRoute.data.subscribe((data) => {
    //   console.log(data);
    // });
  }
}
