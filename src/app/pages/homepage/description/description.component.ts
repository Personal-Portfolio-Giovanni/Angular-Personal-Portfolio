import { Component, Input } from '@angular/core';
import { PortfolioData } from 'src/app/shared/class/portfolio.class';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css'],
})
export class DescriptionComponent {
  @Input('portfolio') portfolio?: PortfolioData;
}
