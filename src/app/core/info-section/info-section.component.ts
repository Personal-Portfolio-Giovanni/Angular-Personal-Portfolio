import { Component } from '@angular/core';
import { ClassType } from 'src/app/shared/class/accordion-constant.class';

@Component({
  selector: 'app-info-section',
  templateUrl: './info-section.component.html',
  styleUrls: ['./info-section.component.css'],
})
export class InfoSectionComponent {
  public get classType(): typeof ClassType {
    return ClassType;
  }
}
