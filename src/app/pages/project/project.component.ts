import { Component, OnInit, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ClassType } from 'src/app/shared/class/accordion-constant.class';
import { CMSData } from 'src/app/shared/class/colorful.class';
import {
  PortfolioData,
  PortfolioProject,
} from 'src/app/shared/class/portfolio.class';
import { CMSService } from 'src/app/shared/services/api/cms.service';
import { PortfolioService } from 'src/app/shared/services/api/portfolio.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  @Output('portfolioProjects') portfolioProjects: Array<PortfolioProject> = [];

  @Output('projects') projects: Array<CMSData> = [];
  constructor(
    private titleService: Title,
    private cmsService: CMSService,
    private portfolioService: PortfolioService
  ) {
    this.titleService.setTitle('Giovanni Lamarmora - Project');
  }

  ngOnInit(): void {
    this.projects = this.cmsService.projectData;
    this.portfolioProjects = this.portfolioService.portfolioProjects;
  }

  public get classType(): typeof ClassType {
    return ClassType;
  }
  changeLanguagesProject(projects: CMSData[]) {
    this.projects = projects;
  }

  changeLanguages(portfolio: PortfolioData) {
    this.portfolioProjects = portfolio.projects;
  }
}
