import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css'],
})
export class LanguageComponent implements OnInit {
  @Input() language!: Language;

  constructor() {}

  ngOnInit(): void {}
}
export interface Language {
  name: string;
  flags: string;
  description: string;
  speaking_title: string;
  speaking_rate: string;
  speaking_width: string;
  writing_title: string;
  writing_rate: string;
  writing_width: string;
  comprehension_title: string;
  comprehension_rate: string;
  comprehension_width: string;
}
