import { Component, Output } from '@angular/core';

@Component({
  selector: 'app-personal-project',
  templateUrl: './personal-project.component.html',
  styleUrls: ['./personal-project.component.css'],
})
export class PersonalProjectComponent {
  @Output('project') project: any;
}
