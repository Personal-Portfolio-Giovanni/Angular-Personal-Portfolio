import { Component, Input } from '@angular/core';
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
}
