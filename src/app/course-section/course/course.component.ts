import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})
export class CourseComponent implements OnInit {
  environment = environment;
  @Input() course!: Course;
  aria_label: string = 'flush-heading';
  aria_control: string = 'flush-collapse';

  constructor() {}

  ngOnInit(): void {
    this.aria_label = this.aria_label + 'Course' + this.course.id;
    this.aria_control = this.aria_control + 'Course' + this.course.id;
  }
}
export interface Course {
  id: number;
  title: string;
  from: string;
  to: string;
  role: string;
  where: string;
  description: string;
}