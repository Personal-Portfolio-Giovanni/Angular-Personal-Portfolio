import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-card-flip',
  templateUrl: './card-flip.component.html',
  styleUrls: ['./card-flip.component.css'],
})
export class CardFlipComponent implements OnInit {
  @Input() project: any;
  environment = environment;

  constructor() {}

  ngOnInit(): void {
    if (!this.project.img.includes('http')) {
      this.project.img = environment.baseUrlV2 + this.project.img;
    }
  }
}
