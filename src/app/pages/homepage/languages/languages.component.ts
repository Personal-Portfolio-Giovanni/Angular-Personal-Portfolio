import { Component } from '@angular/core';
import { ClassType } from 'src/app/shared/class/accordion-constant.class';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css'],
})
export class LanguagesComponent {
  public get classType(): typeof ClassType {
    return ClassType;
  }
}
