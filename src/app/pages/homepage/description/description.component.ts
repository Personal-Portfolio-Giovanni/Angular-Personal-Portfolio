import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { SubscriptionLog } from 'rxjs/internal/testing/SubscriptionLog';
import { PortfolioData } from 'src/app/shared/class/portfolio.class';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css'],
})
export class DescriptionComponent implements OnChanges {
  environment = environment;
  @Input('portfolio') portfolio?: PortfolioData;
  @Input('language') language?: string;

  constructor(
    //private sanitizer: DomSanitizer,
    private translateService: TranslateService
  ) {
    this.updateData(100);
  }

  // transform(html: string) {
  //   return this.sanitizer.bypassSecurityTrustHtml(html);
  // }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['language'] || changes['portfolio']) {
      this.updateData(50);
    }
  }

  public updateData(time: number) {
    setTimeout(() => {
      const data = this.portfolio?.biography
        ? this.portfolio.biography
        : this.translateService.instant('biography.text');
      if (data === 'biography.text') return;
      const element = document.getElementById('bio-text');
      if (element) {
        element.innerHTML = '';
        element.insertAdjacentHTML('beforeend', data);
      }
    }, time);
  }
}
