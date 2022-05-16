import { Component, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Course } from './course/course.component';

@Component({
  selector: 'app-course-section',
  templateUrl: './course-section.component.html',
  styleUrls: ['./course-section.component.css'],
})
export class CourseSectionComponent {
  courseSubscription: Subscription = new Subscription();
  @Output('course') course: Array<Course> = [];
}
