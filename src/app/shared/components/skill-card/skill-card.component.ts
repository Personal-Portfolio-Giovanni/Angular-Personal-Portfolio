import { Component, Input, OnInit } from '@angular/core';
import { AccordionConstants } from '../../class/accordion-constant.class';
import { environment } from 'src/environments/environment';
import { Utils } from '../../services/config/utils.service';

@Component({
  selector: 'app-skill-card',
  templateUrl: './skill-card.component.html',
  styleUrls: ['./skill-card.component.css'],
})
export class SkillCardComponent {
  @Input('content') content!: any;
  environment = environment;

  public get accordionConstant(): typeof AccordionConstants {
    return AccordionConstants;
  }

  containsValue(content: any, accordion: any): boolean {
    return (
      Utils.containsEnumValue(content.description, accordion) ||
      Utils.containsEnumValue(content.title, accordion) ||
      Utils.containsEnumValue(content.where, accordion)
    );
  }
}
