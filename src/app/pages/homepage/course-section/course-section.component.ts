import { Component, Input, Output } from '@angular/core';
import { CourseType } from 'src/app/shared/class/accordion-constant.class';
import { PortfolioCourse } from 'src/app/shared/class/portfolio.class';

@Component({
  selector: 'app-course-section',
  templateUrl: './course-section.component.html',
  styleUrls: ['./course-section.component.css'],
})
export class CourseSectionComponent {
  @Input('portfolioCourses') portfolioCourses?: Array<PortfolioCourse>;
  @Output('parentID') parentID: string = CourseType.PARENTID;
  @Output('code') code: string = CourseType.CODE;
}
