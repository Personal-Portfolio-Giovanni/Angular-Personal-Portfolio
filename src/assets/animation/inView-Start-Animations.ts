import { Injectable } from '@angular/core';

const inViewport = (entries: any[], observer: any) => {
  entries.forEach((entry) => {
    entry.target.classList.toggle('is-inViewport', entry.isIntersecting);
  });
};

@Injectable({
  providedIn: 'root',
})
export class InViewStartAnimations {
  obs: IntersectionObserver = new IntersectionObserver(inViewport);
  obsOptions = {}; //See: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options

  animateOnView() {
    document.querySelectorAll('[data-inviewport]').forEach((EL: any) => {
      this.obs.observe(EL);
      console.log(EL);
    });
  }
}
