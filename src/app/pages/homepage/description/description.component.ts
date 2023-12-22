import { Component, Input } from '@angular/core';
import { ClassType } from 'src/app/shared/class/accordion-constant.class';
import { CMSData } from 'src/app/shared/class/colorful.class';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css'],
})
export class DescriptionComponent {
  @Input('profile') profile?: CMSData;
  
  public get classType(): typeof ClassType {
    return ClassType;
  }
}
