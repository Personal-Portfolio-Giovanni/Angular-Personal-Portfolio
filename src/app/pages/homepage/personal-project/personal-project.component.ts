import { Component, Output } from '@angular/core';
import { Utils } from 'src/app/shared/services/config/utils.service';

@Component({
  selector: 'app-personal-project',
  templateUrl: './personal-project.component.html',
  styleUrls: ['./personal-project.component.css'],
})
export class PersonalProjectComponent {
  @Output('project') project: any;

  scrollTo(id: string) {
    Utils.scrollTo(id);
  }
}
