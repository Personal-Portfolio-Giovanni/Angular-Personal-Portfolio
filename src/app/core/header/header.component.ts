import { animate, style, transition, trigger } from '@angular/animations';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';
import { PortfolioService } from 'src/app/shared/services/api/portfolio.service';
import { Subscription, timer } from 'rxjs';
import { LOG } from 'src/app/shared/services/config/logger.service';
import { Locale, PortfolioData } from 'src/app/shared/class/portfolio.class';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ height: 0, opacity: 0, display: 'none' }),
        animate(
          '0.5s ease-out',
          style({ height: 300, opacity: 1, display: 'block' })
        ),
      ]),
      transition(':leave', [
        style({ height: 300, opacity: 1, display: 'block' }),
        animate(
          '0.5s ease-in',
          style({ height: 0, opacity: 0, display: 'none' })
        ),
      ]),
    ]),
  ],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private portfolioSubscribe: Subscription = new Subscription();
  portfolioData?: PortfolioData;
  @Output('changeLanguages') changeLanguages =
    new EventEmitter<PortfolioData>();

  environment = environment;
  downloadCV: boolean = false;
  firstname: string = 'Giovanni';
  lastname: string = 'Lamarmora';

  private ATTR_LANGUAGE: string = 'profile_language';
  private DEFAULT_LANGUAGE: string = 'en-GB';

  constructor(
    private translate: TranslateService,
    private portfolioService: PortfolioService
  ) {
    //translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    Promise.resolve().then(() => this.setLanguages());
  }

  setLanguages() {
    let languages = localStorage.getItem(this.ATTR_LANGUAGE);
    if (!languages) languages = this.DEFAULT_LANGUAGE;
    this.changeLanguage(languages);
  }

  changeLanguage(lan: string) {
    this.translate.setDefaultLang(lan);
    localStorage.setItem(this.ATTR_LANGUAGE, lan);
    let languageIT = document.getElementById('italian') as HTMLElement;
    let languageEN = document.getElementById('english') as HTMLElement;
    if (lan == this.DEFAULT_LANGUAGE) {
      languageIT.classList.remove('active');
      languageEN.classList.add('active');
      this.checkAndGetPortfolioData(Locale.ENGLISH);
    } else {
      languageEN.classList.remove('active');
      languageIT.classList.add('active');
      this.checkAndGetPortfolioData(Locale.ITALIAN);
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let element = document.getElementById('navbar') as HTMLElement;
    if (window.pageYOffset > element.clientHeight) {
      element.classList.add('navbar-inverse');
    } else {
      element.classList.remove('navbar-inverse');
    }
  }

  checkAndGetPortfolioData(locale: Locale) {
    this.portfolioSubscribe = this.portfolioService
      .getPortfolioData(locale)
      .subscribe((res) => {
        this.portfolioService.cache.cachePortfolioData(res.data, locale);
        PortfolioService.portfolioProjects = res.data.projects;
        this.portfolioService.portfolioProjects = res.data.projects;
        LOG.info(res.message!, 'HeaderComponent');
        this.portfolioData = res.data;
        this.changeLanguages.emit(res.data);
      });
  }

  ngOnDestroy(): void {
    this.portfolioSubscribe.unsubscribe();
  }
}
