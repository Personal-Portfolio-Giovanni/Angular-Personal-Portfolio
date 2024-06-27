import { Component, OnInit } from '@angular/core';
import { AnimationsService } from 'src/app/shared/services/config/animation.service';
import { LoggerService } from 'src/app/shared/services/config/log.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  mobileDevice: Array<string> = ['Android', 'iPhone'];
  animation: string = '';
  SLIDE_RIGHT: string = 'slide-right';
  SLIDE_LEFT: string = 'slide-left';

  constructor(
    private animationService: AnimationsService,
    private logger: LoggerService
  ) {}

  ngOnInit(): void {
    this.logger.LOG(navigator.userAgent, 'Current Device');
    let isMobileDevice: boolean = false;
    this.mobileDevice.forEach((device) => {
      const isMobile = navigator.userAgent.includes(device);
      if (isMobile) {
        isMobileDevice = true;
      }
    });
    if (isMobileDevice) {
      this.animation = this.SLIDE_LEFT;
    } else {
      this.animation = this.SLIDE_RIGHT;
    }
    this.animationService.setAnimation('#footer-text', this.animation);
  }
  environment = environment;
}
