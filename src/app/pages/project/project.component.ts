import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ClassType } from 'src/app/shared/class/accordion-constant.class';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  public get classType(): typeof ClassType {
    return ClassType;
  }
}
