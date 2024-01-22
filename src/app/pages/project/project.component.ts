import { Component, OnInit, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ClassType } from 'src/app/shared/class/accordion-constant.class';
import { CMSData } from 'src/app/shared/class/colorful.class';
import { CMSService } from 'src/app/shared/services/cms.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  @Output('projects') projects: Array<CMSData> = [];
  constructor(private titleService: Title, private cmsService: CMSService) {
    this.titleService.setTitle('Giovanni Lamarmora - Project');
  }

  ngOnInit(): void {
    this.projects = this.cmsService.projectData;
  }

  public get classType(): typeof ClassType {
    return ClassType;
  }
  changeLanguagesProject(projects: CMSData[]) {
    this.projects = projects;
  }
}
