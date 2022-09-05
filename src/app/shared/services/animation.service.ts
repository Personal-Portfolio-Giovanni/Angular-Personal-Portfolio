import { Injectable } from '@angular/core';
import { InViewStartAnimations } from 'src/assets/animation/inView-Start-Animations';
import { RevealUpAnimations } from 'src/assets/animation/reveal-up/reveal_up';
import { environment } from 'src/environments/environment';
import { LoggerService } from './log.service';

declare function particlesJS(environment: string): any;
declare function reveal(): any;

@Injectable({
  providedIn: 'root',
})
export class AnimationsService {
  environment = environment;
  animation_title: string = '';
  constructor(
    public revealUp: RevealUpAnimations,
    public inViewStartAnimation: InViewStartAnimations,
    private logger: LoggerService
  ) {}

  initAnimations() {
    this.scrollTriggerSwitch();
    this.startParticleBackgroudEffect();
    this.inViewStartAnimation.animateOnView();
  }

  scrollTriggerSwitch() {
    this.logger.LOG(
      ScrollTrigger.toString(),
      'ScrollTrigger TypeScript STATUS:'
    );
    if (environment.isRevealUpTS) {
      if (ScrollTrigger != undefined || ScrollTrigger === null) {
        this.revealUp.initAnimation();
        this.logger.LOG(
          'RevealUp Typescript is Selected',
          'AnimationsService: initAnimations'
        );
      } else {
        reveal();
        this.logger.LOG(
          'RevealUp Typescript is Undefined, Javascript is Selected',
          'AnimationsService: initAnimations'
        );
      }
    } else {
      reveal();
      this.logger.LOG(
        'RevealUp Javascript is Selected',
        'AnimationsService: initAnimations'
      );
    }
  }

  startParticleBackgroudEffect() {
    this.logger.LOG(
      'Is ParticleJS Active: ' + environment.isParticleJSActive,
      'AnimationsService: ParticleBackgroudEffect'
    );
    if (environment.isParticleJSActive) {
      particlesJS(environment.envType);
    }
  }

  changeAnimationAfterStopRevealUp() {
    this.logger.LOG(
      'Activating InView Animation with effect: ' + this.animation_title,
      'AnimationsService: changeAnimation'
    );
    document.querySelectorAll('#title_section').forEach((element) => {
      element.setAttribute('data-inviewport', this.animation_title);
    });
  }
}
