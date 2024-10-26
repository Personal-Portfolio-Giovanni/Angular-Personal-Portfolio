import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PortfolioData } from 'src/app/shared/class/portfolio.class';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css'],
})
export class DescriptionComponent {
  environment = environment;
  @Input('portfolio') portfolio?: PortfolioData;

  constructor(private sanitizer: DomSanitizer) {}

  transform(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
