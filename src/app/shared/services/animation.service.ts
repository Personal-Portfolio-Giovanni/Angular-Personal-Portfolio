import { Injectable } from '@angular/core';
import { InViewStartAnimations } from 'src/assets/animation/inView-Start-Animations';
import { RevealUpAnimations } from 'src/assets/animation/reveal-up/reveal_up';
import { environment } from 'src/environments/environment';
import { LoggerService } from './log.service';

declare function particlesJS(environment: string): any;

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
    this.revealUp.initAnimation();
    this.startParticleBackgroudEffect();
    this.inViewStartAnimation.animateOnView();
  }

  startParticleBackgroudEffect() {
    this.logger.LOG('Is ParticleJS Active: ' + environment.isParticleJSActive);
    if (environment.isParticleJSActive) {
      particlesJS(environment.envType);
    }
  }

  changeAnimationAfterStopRevealUp() {
    this.logger.LOG(
      'Activating InView Animation with effect: ' + this.animation_title
    );
    document.querySelectorAll('#title_section').forEach((element) => {
      element.setAttribute('data-inviewport', this.animation_title);
    });
  }
}
