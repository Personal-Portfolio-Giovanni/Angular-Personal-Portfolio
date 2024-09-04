import {
  Component,
  Input,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { environment } from 'src/environments/environment';
import { AccordionConstants } from '../../class/accordion-constant.class';
import { AnimationsService } from '../../services/config/animation.service';

@Component({
  selector: 'app-accordion-content',
  templateUrl: './accordion-content.component.html',
  styleUrls: ['./accordion-content.component.css'],
})
export class AccordionContentComponent implements OnInit, AfterViewInit {
  @Input('parentData') parentData!: string;
  @Input('code') code!: string;
  @Input('content') content!: any;

  @ViewChild('accordionHeader') accordionHeader!: ElementRef;

  isOpen: boolean = true;
  environment = environment;
  aria_label: string = 'flush-heading';
  aria_control: string = 'flush-collapse';

  constructor(private animationService: AnimationsService) {}

  ngOnInit(): void {
    if (this.content.descriptionValue != undefined)
      this.content.description = this.content.descriptionValue;

    this.aria_label = this.aria_label + this.code + this.content.identifier;
    this.aria_control = this.aria_control + this.code + this.content.identifier;
  }

  ngAfterViewInit(): void {
    // Aggiungi l'event listener per l'evento 'shown.bs.collapse'
    const accordionElement = document.getElementById(this.aria_control);
    if (accordionElement) {
      accordionElement.addEventListener('shown.bs.collapse', () => {
        this.scrollToAccordion();
      });
    }
  }

  scrollToAccordion() {
    const headerOffset = 90; // Altezza dell'header in pixel
    const elementPosition =
      this.accordionHeader.nativeElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }

  startStopAnimation() {
    if (environment.isRevealUpActive) {
      this.animationService.revealUp.stop();
      this.activateSlideUpAfterStopRevealUp();
    }
  }

  activateSlideUpAfterStopRevealUp() {
    this.animationService.animation_title = 'slide-up';
    this.animationService.changeAnimationAfterStopRevealUp();
  }

  public get accordionConstant(): typeof AccordionConstants {
    return AccordionConstants;
  }
}
