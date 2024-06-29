import { Component, Input } from '@angular/core';
import { ClassType } from 'src/app/shared/class/accordion-constant.class';
import { PortfolioData } from 'src/app/shared/class/portfolio.class';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css'],
})
export class DescriptionComponent {
  @Input('portfolio') portfolio?: PortfolioData;

  public get classType(): typeof ClassType {
    return ClassType;
  }
}
