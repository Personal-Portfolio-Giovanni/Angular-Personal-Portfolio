import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { RevealUpAnimations } from 'src/assets/animation/reveal_up';
import { environment } from '../environments/environment';

declare let gtag: Function;
declare function reveal(): any;
declare function particlesJS(): any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private router: Router, private revealUp: RevealUpAnimations) {}
  ngOnInit(): void {
    this.setUpAnalytics();
    //reveal();
    this.revealUp.initAnimation();
    particlesJS();
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
