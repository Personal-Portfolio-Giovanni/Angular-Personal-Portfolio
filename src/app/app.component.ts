import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { LOG } from './shared/services/config/logger.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  environment = environment;
  title = 'Personal-Portfolio';

  private isCheckingForUpdate = false;

  constructor(private readonly updates: SwUpdate) {
    LOG.info(`V${environment.version}`, "App Version");
    this.updates.versionUpdates.subscribe((event) => {
      if (event.type === 'VERSION_READY' && !this.isCheckingForUpdate) {
        this.isCheckingForUpdate = true;
        LOG.info(
          'New version available, preparing to update...',
          'AppComponent'
        );
        this.doAppUpdate();
      }
    });
  }

  private async doAppUpdate() {
    try {
      await this.updates.activateUpdate();
      LOG.info('Update activated. Reloading the page...', 'AppComponent');
      window.location.reload();
    } catch (error) {
      LOG.info('Error activating update', 'AppComponent');
    } finally {
      this.isCheckingForUpdate = false;
    }
  }
}
