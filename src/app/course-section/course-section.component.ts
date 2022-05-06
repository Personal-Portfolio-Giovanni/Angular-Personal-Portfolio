import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-course-section',
  templateUrl: './course-section.component.html',
  styleUrls: ['./course-section.component.css'],
})
export class CourseSectionComponent implements OnInit {
  environment = environment;
  aria_label: string = 'flush-heading';
  aria_control: string = 'flush-collapse';

  constructor() {}

  ngOnInit(): void {}
}
