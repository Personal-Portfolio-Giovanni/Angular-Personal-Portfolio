import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AnimationsService } from 'src/app/shared/services/animation.service';
import { GoogleTagManagerService } from 'src/app/shared/services/google.tag.manager.service';
import { environment } from 'src/environments/environment';

declare let gtag: Function;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent {
  constructor(
    private router: Router,
    private animationService: AnimationsService,
    private googleTag: GoogleTagManagerService
  ) {}
  ngOnInit(): void {
    this.setUpAnalytics();
    this.animationService.initAnimations();
    this.googleTag.setUpTag();
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
  title = 'Giovanni Lamarmora | Portfolio';
}
