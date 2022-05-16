import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css'],
})
export class WorkComponent implements OnInit {
  environment = environment;
  @Input() work!: Work;
  aria_label: string = 'flush-heading';
  aria_control: string = 'flush-collapse';

  constructor() {}

  ngOnInit(): void {
    this.aria_label = this.aria_label + 'Work' + this.work.id;
    this.aria_control = this.aria_control + 'Work' + this.work.id;
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
