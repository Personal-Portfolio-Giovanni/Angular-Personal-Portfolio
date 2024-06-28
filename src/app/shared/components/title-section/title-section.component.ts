import { Component, Input, OnInit } from '@angular/core';
import { AnimationsService } from '../../services/config/animation.service';

@Component({
  selector: 'app-title-section',
  templateUrl: './title-section.component.html',
  styleUrls: ['./title-section.component.scss'],
})
export class TitleSectionComponent {
  @Input('class') class: string = '';
  @Input('title') title: string = '';
  @Input('sub_title') sub_title: string = '';
  animation_title: string = '';

  constructor(public animationService: AnimationsService) {}

  changeAnimation() {
    this.animation_title = this.animationService.animation_title;
    document.querySelectorAll('#title_section').forEach((element) => {
      element.setAttribute('data-inviewport', this.animation_title);
    });
  }
}
