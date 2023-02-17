import { Component, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ClassType } from 'src/app/shared/class/accordion-constant.class';
import { CMSData } from 'src/app/shared/class/colorful.class';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  @Output('projects') projects: Array<CMSData> = [];
  constructor() {}

  ngOnInit(): void {}

  public get classType(): typeof ClassType {
    return ClassType;
  }
  changeLanguagesProject(projects: CMSData[]) {
    this.projects = projects;
  }
}
