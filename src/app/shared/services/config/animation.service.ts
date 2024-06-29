import { Injectable } from '@angular/core';
import { InViewStartAnimations } from 'src/assets/animation/inView-Start-Animations';
import { RevealUpAnimations } from 'src/assets/animation/reveal-up/reveal_up';
import { environment } from 'src/environments/environment';
import { LOG } from './logger.service';

declare function particlesJS(environment: string): any;
declare function reveal(): any;

@Injectable({
  providedIn: 'root',
})
export class AnimationsService {
  environment = environment;
  isLoading = true;
  animation_title: string = '';
  constructor(
    public revealUp: RevealUpAnimations,
    public inViewStartAnimation: InViewStartAnimations
  ) {}

  initAnimations() {
    this.scrollTriggerSwitch();
    this.startParticleBackgroudEffect();
    this.inViewStartAnimation.animateOnView();
  }

  scrollTriggerSwitch() {
    if (!environment.isRevealUpActive) {
      LOG.info(
        'Is RevealUpActive: ' +
          environment.isRevealUpActive +
          'Setting onView Slide Up',
        'RevealUpAnimations: initAnimation'
      );
      this.animation_title = 'slide-up';
      this.changeAnimationAfterStopRevealUp();
    } else if (environment.isRevealUpTS) {
      LOG.info(ScrollTrigger.toString(), 'ScrollTrigger TypeScript STATUS:');
      if (ScrollTrigger != undefined || ScrollTrigger === null) {
        this.revealUp.initAnimation();
        LOG.info(
          'RevealUp Typescript is Selected',
          'AnimationsService: initAnimations'
        );
      } else {
        reveal();
        LOG.info(
          'RevealUp Typescript is Undefined, Javascript is Selected',
          'AnimationsService: initAnimations'
        );
      }
    } else {
      reveal();
      LOG.info(
        'RevealUp Javascript is Selected',
        'AnimationsService: initAnimations'
      );
    }
  }

  startParticleBackgroudEffect() {
    LOG.info(
      'Is ParticleJS Active: ' + environment.isParticleJSActive,
      'AnimationsService: ParticleBackgroudEffect'
    );
    if (environment.isParticleJSActive) {
      particlesJS(environment.envType);
    }
  }

  changeAnimationAfterStopRevealUp() {
    LOG.info(
      'Activating InView Animation with effect: ' + this.animation_title,
      'AnimationsService: changeAnimation'
    );
    document.querySelectorAll('#title_section').forEach((element) => {
      element.setAttribute('data-inviewport', this.animation_title);
    });
  }

  /**
   * Method to let you set the OnView Animation
   * @param querySelector id of the selector
   * @param animation {slide-up, slide-left, slide-right}
   */
  setAnimation(querySelector: string, animation: string) {
    LOG.info(
      'Activating InView Animation with effect: ' +
        animation +
        ' for the query: ' +
        querySelector,
      'AnimationsService: setAnimation'
    );
    document.querySelectorAll(querySelector).forEach((element) => {
      element.setAttribute('data-inviewport', animation);
    });
  }
}
