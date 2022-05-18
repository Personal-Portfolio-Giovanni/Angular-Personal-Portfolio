import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-title-section',
  templateUrl: './title-section.component.html',
  styleUrls: ['./title-section.component.scss'],
})
export class TitleSectionComponent implements OnInit {
  @Input('class') class: string = '';
  @Input('title') title: string = '';
  @Input('sub_title') sub_title: string = '';

  constructor() {}

  ngOnInit(): void {}
}
