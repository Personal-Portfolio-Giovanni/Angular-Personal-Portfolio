import { Component, OnDestroy, OnInit } from '@angular/core';
import { AnimationsService } from 'src/app/shared/services/animation.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  constructor(private animationServices: AnimationsService) {}

  removeLoader(): void {
    document.removeEventListener('DOMContentLoaded', () => {
      this.eventListener();
    });
  }

  ngOnInit(): void {
    document.addEventListener('DOMContentLoaded', () => {
      this.eventListener();
    });
  }

  eventListener() {
    var loader = document.getElementById('loader');
    setTimeout(() => {
      var loaderOpacity = 1;
      var fadeAnimation = setInterval(() => {
        if (loaderOpacity <= 0.05) {
          clearInterval(fadeAnimation);
          loader!.style.opacity = '0';
          loader!.style.display = 'none';
        }
        loader!.style.opacity = loaderOpacity.toString();
        loader!.style.filter = 'alpha(opacity=' + loaderOpacity * 100 + ')';
        loaderOpacity = loaderOpacity - loaderOpacity * 0.5;
      }, 30);
    }, 1000);
  }
}
