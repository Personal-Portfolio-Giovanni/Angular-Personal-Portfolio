import { Component, Input, OnInit } from '@angular/core';
import { PortfolioProject } from '../../class/portfolio.class';
import { Utils } from '../../services/config/utils.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-card-flip-elegant',
  templateUrl: './card-flip-elegant.component.html',
  styleUrls: ['./card-flip-elegant.component.css'],
})
export class CardFlipElegantComponent implements OnInit {
  @Input('project') project?: PortfolioProject;
  environment = environment;

  constructor() {}

  ngOnInit(): void {
    if (
      (!Utils.isNullOrEmpty(this.project) &&
        !Utils.isNullOrEmpty(this.project?.image) &&
        !this.project?.image.includes('http')) ||
      !this.project?.image.includes('https')
    ) {
      this.project!.image = environment.baseUrlV2 + this.project!.image;
    }
  }
}
