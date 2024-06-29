import { Component, OnInit } from '@angular/core';
import { AnimationsService } from 'src/app/shared/services/config/animation.service';
import { LOG } from 'src/app/shared/services/config/logger.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  isAppleDevice: boolean = false;
  environment = environment;
  constructor(private animation: AnimationsService) {}

  removeLoader(): void {
    document.removeEventListener('DOMContentLoaded', () => {
      this.eventListener();
    });
  }

  ngOnInit(): void {
    this.detectIOS();
    if (!this.isAppleDevice && this.animation.isLoading)
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
    }, environment.loadingTime);
  }

  detectIOS() {
    var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    var isAppleDevice = navigator.userAgent.includes('Macintosh');

    var isTouchScreen = navigator.maxTouchPoints >= 1; // true for iOS 13 (and hopefully beyond)
    let message =
      'Detected device for ' +
        navigator.userAgent +
        ' is Apple Device: ' +
        isIOS ||
      (isAppleDevice && isTouchScreen);
    LOG.info(message.toString(), 'Detecting OS');

    this.isAppleDevice = isIOS || (isAppleDevice && isTouchScreen);
  }
}
