import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PortfolioProject } from '../../class/portfolio.class';
import { Utils } from '../../services/config/utils.service';

@Component({
  selector: 'app-card-flip',
  templateUrl: './card-flip.component.html',
  styleUrls: ['./card-flip.component.css'],
})
export class CardFlipComponent implements OnInit {
  @Input("title") title?: string;
  @Input("background") background?: string;

  @Input('project') project?: PortfolioProject;
  environment = environment;
  style: string = "background-image: url('#URL'); align-items: cover;";

  constructor() {}

  ngOnInit(): void {
    console.log(this.project)
    if (
      (!Utils.isNullOrEmpty(this.project) &&
        !Utils.isNullOrEmpty(this.project?.image) &&
        !this.project?.image.includes('http')) ||
      !this.project?.image.includes('https')
    ) {
      this.project!.image = environment.baseUrlV2 + this.project!.image;
    }
    this.style = this.style.replace('#URL', this.project!.image);
  }
}
