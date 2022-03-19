import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('0.3s ease-out', style({ height: 300, opacity: 1 })),
      ]),
      transition(':leave', [
        style({ height: 300, opacity: 1 }),
        animate('0.3s ease-in', style({ height: 0, opacity: 0 })),
      ]),
    ]),
  ],
})
export class HeaderComponent implements OnInit {
  environment = environment;
  downloadCV: boolean = false;
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
}
