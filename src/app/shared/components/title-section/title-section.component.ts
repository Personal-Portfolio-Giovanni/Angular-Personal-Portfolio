import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-title-section',
  templateUrl: './title-section.component.html',
  styleUrls: ['./title-section.component.css'],
})
export class TitleSectionComponent implements OnInit {
  @Input('title') title: string = '';
  @Input('sub_title') sub_title: string = '';

  constructor() {}

  ngOnInit(): void {}
}
