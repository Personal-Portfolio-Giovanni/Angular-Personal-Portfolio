import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-flip',
  templateUrl: './card-flip.component.html',
  styleUrls: ['./card-flip.component.css'],
})
export class CardFlipComponent implements OnInit {
  @Input() project: any;

  constructor() {}

  ngOnInit(): void {
    
  }
}
