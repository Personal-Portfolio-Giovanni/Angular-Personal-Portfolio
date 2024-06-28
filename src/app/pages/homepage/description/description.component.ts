import { Component, Input, OnInit } from '@angular/core';
import { ClassType } from 'src/app/shared/class/accordion-constant.class';
import { CMSData } from 'src/app/shared/class/colorful.class';
import { PortfolioData } from 'src/app/shared/class/portfolio.class';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css'],
})
export class DescriptionComponent implements OnInit {
  @Input('portfolio') portfolio?: PortfolioData;

  public get classType(): typeof ClassType {
    return ClassType;
  }

  ngOnInit(): void {
    console.log(this.portfolio);
  }
}
