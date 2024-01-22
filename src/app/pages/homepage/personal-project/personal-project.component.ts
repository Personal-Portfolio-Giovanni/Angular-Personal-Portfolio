import { Component, Output } from '@angular/core';
import { ClassType } from 'src/app/shared/class/accordion-constant.class';

@Component({
  selector: 'app-personal-project',
  templateUrl: './personal-project.component.html',
  styleUrls: ['./personal-project.component.css'],
})
export class PersonalProjectComponent {
  @Output('project') project: any;

  public get classType(): typeof ClassType {
    return ClassType;
  }
}
