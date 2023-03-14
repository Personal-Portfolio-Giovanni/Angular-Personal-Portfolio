import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Angular-Personal-Portfolio';

  constructor(private readonly updates: SwUpdate) {
    this.updates.versionUpdates.subscribe((event) => {
      this.doAppUpdate();
    });
  }

  doAppUpdate() {
    this.updates.activateUpdate().then(() => document.location.reload());
  }
}
