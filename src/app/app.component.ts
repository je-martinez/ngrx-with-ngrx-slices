import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { items } from 'src/constants/menu.items';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  menuItems = [...items];
  title = 'ngrx-with-ngrx-slices';
}
