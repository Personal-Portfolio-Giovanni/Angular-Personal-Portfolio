import { Component, Input, OnInit, Output } from '@angular/core';
import {
  ClassType,
  WorkType,
} from 'src/app/shared/class/accordion-constant.class';
import { CMSData } from 'src/app/shared/class/colorful.class';
import { CMSService } from 'src/app/shared/services/api/cms.service';

@Component({
  selector: 'app-works-section',
  templateUrl: './works-section.component.html',
  styleUrls: ['./works-section.component.css'],
})
export class WorkSectionComponent implements OnInit {
  @Input('works') works: Array<CMSData> = [];
  @Output('code') code: string = WorkType.CODE;
  @Output('parentID') parentID: string = WorkType.PARENTID;

  public get classType(): typeof ClassType {
    return ClassType;
  }
  constructor(private contentService: CMSService) {}

  ngOnInit(): void {
    setTimeout(() => {
      if (
        this.contentService.worksData &&
        this.contentService.worksData.length > 0
      ) {
        this.works = this.contentService.worksData;
      }
    }, 500);
  }
}
