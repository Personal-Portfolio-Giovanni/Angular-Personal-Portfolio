import { Component, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Work } from './work/work.component';

@Component({
  selector: 'app-works-section',
  templateUrl: './works-section.component.html',
  styleUrls: ['./works-section.component.css'],
})
export class WorkSectionComponent {
  worksSubscription: Subscription = new Subscription();
  @Output('works') works: Array<Work> = [];
}
