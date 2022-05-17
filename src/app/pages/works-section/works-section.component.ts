import { Component, Output } from '@angular/core';
import { WorkType } from 'src/app/shared/class/accordion-constant.class';
import { WorkInterface } from 'src/app/shared/interfaces/work.interface';

@Component({
  selector: 'app-works-section',
  templateUrl: './works-section.component.html',
  styleUrls: ['./works-section.component.css'],
})
export class WorkSectionComponent {
  @Output('works') works: Array<WorkInterface> = [];
  @Output('code') code: string = WorkType.CODE;
  @Output('parentID') parentID: string = WorkType.PARENTID;
}
