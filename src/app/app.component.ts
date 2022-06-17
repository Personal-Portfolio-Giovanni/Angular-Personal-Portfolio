import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { environment } from '../environments/environment';

declare let gtag: Function;
declare function reveal(): any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.setUpAnalytics();
    reveal();
  }
  setUpAnalytics() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          gtag('config', environment.googleID, {
            page_path: event.urlAfterRedirects,
          });
        }
      });
  }
  title = 'Angular-Personal-Portfolio';
}
