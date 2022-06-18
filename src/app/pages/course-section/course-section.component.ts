import { Component, Output } from '@angular/core';
import {
  ClassType,
  CourseType,
} from 'src/app/shared/class/accordion-constant.class';
import { CourseInterface } from 'src/app/shared/interfaces/course.interface';

@Component({
  selector: 'app-course-section',
  templateUrl: './course-section.component.html',
  styleUrls: ['./course-section.component.css'],
})
export class CourseSectionComponent {
  @Output('course') course: Array<CourseInterface> = [];
  @Output('parentID') parentID: string = CourseType.PARENTID;
  @Output('code') code: string = CourseType.CODE;

  public get classType(): typeof ClassType {
    return ClassType;
  }
}
