import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-works-section',
  templateUrl: './works-section.component.html',
  styleUrls: ['./works-section.component.css'],
})
export class WorkSectionComponent implements OnInit {
  public works: Array<Work> = [];
  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.translate.get('works').subscribe((resp) => {
      this.works = <Work[]>resp;
    });
  }
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
