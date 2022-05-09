import {
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-works-section',
  templateUrl: './works-section.component.html',
  styleUrls: ['./works-section.component.css'],
})
export class WorkSectionComponent {
  environment = environment;
  worksSubscription: Subscription = new Subscription();
  @Output('works') works: Array<Work> = [];
}
export interface Work {
  id: number;
  title: string;
  from: string;
  to: string;
  role: string;
  where: string;
  description: string;
}
