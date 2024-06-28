import { Component, Input, OnInit, Output } from '@angular/core';
import {
  ClassType,
  CourseType,
} from 'src/app/shared/class/accordion-constant.class';
import { CMSData } from 'src/app/shared/class/colorful.class';
import { PortfolioCourse } from 'src/app/shared/class/portfolio.class';
import { CMSService } from 'src/app/shared/services/api/cms.service';

@Component({
  selector: 'app-course-section',
  templateUrl: './course-section.component.html',
  styleUrls: ['./course-section.component.css'],
})
export class CourseSectionComponent implements OnInit {
  @Input('portfolioCourses') portfolioCourses?: Array<PortfolioCourse>;

  @Input('courses') courses: Array<CMSData> = [];
  @Output('parentID') parentID: string = CourseType.PARENTID;
  @Output('code') code: string = CourseType.CODE;

  constructor(private contentService: CMSService) {}

  public get classType(): typeof ClassType {
    return ClassType;
  }
  ngOnInit(): void {
    setTimeout(() => {
      if (
        this.contentService.courseData &&
        this.contentService.courseData.length > 0
      ) {
        this.courses = this.contentService.courseData;
      }
    }, 500);
  }
}
