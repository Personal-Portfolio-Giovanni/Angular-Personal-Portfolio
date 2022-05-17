import { Component, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { CourseType } from 'src/app/shared/class/accordion-constant.class';
import { Course } from './course/course.component';

@Component({
  selector: 'app-course-section',
  templateUrl: './course-section.component.html',
  styleUrls: ['./course-section.component.css'],
})
export class CourseSectionComponent {
  courseSubscription: Subscription = new Subscription();
  @Output('course') course: Array<Course> = [];
  @Output('parentID') parentID: string = CourseType.PARENTID;
  @Output('code') code: string = CourseType.CODE;
}
