import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { LOG } from './shared/services/config/logger.service';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Personal-Portfolio';

  constructor(private readonly updates: SwUpdate) {
    this.updates.versionUpdates.subscribe((event) => {
      LOG.info('Updating app', 'AppComponent');
      this.doAppUpdate();
    });
  }

  doAppUpdate() {
    this.updates.activateUpdate().then(() => document.location.reload());
  }
}
