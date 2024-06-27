import { Component, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { CMSData } from 'src/app/shared/class/colorful.class';
import { PortfolioData } from 'src/app/shared/class/portfolio.class';
import { AnimationsService } from 'src/app/shared/services/config/animation.service';
import { environment } from 'src/environments/environment';

declare let gtag: Function;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent {
  @Output('portfolio') portfolio?: PortfolioData;
  @Output('works') works: Array<CMSData> = [];
  @Output('courses') courses: Array<CMSData> = [];
  @Output('courses') profile?: CMSData;
  constructor(
    private router: Router,
    private animationService: AnimationsService,
    private titleService: Title
  ) {
    this.titleService.setTitle(
      'Giovanni Lamarmora - Web Developer based in Milan'
    );
  }
  ngOnInit(): void {
    this.setUpAnalytics();
    this.animationService.initAnimations();
  }

  changeLanguages(portfolio: PortfolioData) {
    this.portfolio = portfolio;
  }

  changeLanguagesWork(works: Array<CMSData>) {
    this.works = works;
  }

  changeLanguagesCourse(courses: Array<CMSData>) {
    this.courses = courses;
  }

  changeLanguagesProfile(profile: CMSData) {
    this.profile = profile;
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
}
