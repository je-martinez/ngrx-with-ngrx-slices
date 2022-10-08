import { Component, OnDestroy, OnInit } from '@angular/core';
import { items } from 'src/constants/menu.items';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject, takeUntil, filter, map, mergeMap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  menuItems = [...items];
  title = 'ngrx-with-ngrx-slices';
  private readonly unsubscribe$ = new Subject<void>();

  constructor(
    private titleService: Title,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routeChangeHandler();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private routeChangeHandler() {
    this._router.events
      .pipe(
        takeUntil(this.unsubscribe$),
        filter((event) => event instanceof NavigationEnd),
        map(() => this.rootRoute(this._activatedRoute)),
        mergeMap((route: ActivatedRoute) => route.data)
      )
      .subscribe((data) => {
        if (!data['title']) return;
        this.changeTitleOnNavigation(data['title']);
      });
  }

  private rootRoute(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }

  private changeTitleOnNavigation(title: string) {
    this.titleService.setTitle(title);
  }
}
