import { animate, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';

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
export class HeaderComponent implements OnInit {
  environment = environment;
  downloadCV: boolean = false;
  firstname: string = 'Giovanni';
  lastname: string = 'Lamarmora';
  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {}
  changeLanguage(lan: string) {
    this.translate.setDefaultLang(lan);
    let languageIT = document.getElementById('italian') as HTMLElement;
    let languageEN = document.getElementById('english') as HTMLElement;
    if (lan == 'it') {
      languageIT.classList.add('active');
      languageEN.classList.remove('active');
    } else {
      languageEN.classList.add('active');
      languageIT.classList.remove('active');
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
}
