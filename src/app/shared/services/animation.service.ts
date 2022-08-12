import { Injectable } from '@angular/core';
import { InViewStartAnimations } from 'src/assets/animation/inView-Start-Animations';
import { RevealUpAnimations } from 'src/assets/animation/reveal-up/reveal_up';
import { environment } from 'src/environments/environment';

declare function particlesJS(): any;

@Injectable({
  providedIn: 'root',
})
export class AnimationsService {
  environment = environment;
  constructor(
    public revealUp: RevealUpAnimations,
    public inViewStartAnimation: InViewStartAnimations
  ) {}

  initAnimations() {
    this.revealUp.initAnimation();
    this.startParticleBackgroudEffect();
    this.inViewStartAnimation.animateOnView();
  }

  startParticleBackgroudEffect() {
    particlesJS();
  }
}
