import { Component, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { PortfolioData } from 'src/app/shared/class/portfolio.class';
import { PortfolioService } from 'src/app/shared/services/api/portfolio.service';
import { AnimationsService } from 'src/app/shared/services/config/animation.service';

@Component({
  selector: 'app-cookie-policy',
  templateUrl: './cookie-policy.component.html',
  styleUrl: './cookie-policy.component.css',
})
export class CookiePolicyComponent {
  @Output('portfolio') portfolio?: PortfolioData;

  constructor(
    private titleService: Title,
    private portfolioService: PortfolioService,
    private animationService: AnimationsService,
    private translateService: TranslateService
  ) {
    this.titleService.setTitle('Giovanni Lamarmora - Cookie Policy');
  }

  ngOnInit(): void {
    this.animationService.initAnimations();
    this.portfolio = this.portfolioService.portfolio;
    this.updateData(1000);
  }

  changeLanguages(portfolio: PortfolioData) {
    this.portfolio = portfolio;
    this.updateData(100);
  }

  getDataLanguages(languages: string) {
    this.updateData(100);
  }

  public updateData(time: number) {
    setTimeout(() => {
      const data = this.portfolio?.cookie_policy
        ? this.portfolio.cookie_policy
        : this.translateService.instant('cookie-policy.payload');
      if (data === 'cookie-policy.payload') return;
      const element = document.getElementById('cookie-data');
      if (element) {
        element.innerHTML = '';
        element.insertAdjacentHTML('beforeend', data);
      }
    }, time);
  }
}
