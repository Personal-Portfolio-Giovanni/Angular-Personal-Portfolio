import { Component, Input, Output } from '@angular/core';
import {
  ClassType,
  WorkType,
} from 'src/app/shared/class/accordion-constant.class';
import { PortfolioWork } from 'src/app/shared/class/portfolio.class';

@Component({
  selector: 'app-works-section',
  templateUrl: './works-section.component.html',
  styleUrls: ['./works-section.component.css'],
})
export class WorkSectionComponent {
  @Input('portfolioWorks') portfolioWorks?: Array<PortfolioWork>;
  @Output('code') code: string = WorkType.CODE;
  @Output('parentID') parentID: string = WorkType.PARENTID;

  public get classType(): typeof ClassType {
    return ClassType;
  }
}
