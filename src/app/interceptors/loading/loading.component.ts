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

  ngOnInit(): void {
    this.detectAppleDevice();

    // Se l'animazione è attiva, gestisci il loader
    if (this.animation.isLoading) {
      document.addEventListener('DOMContentLoaded', () => {
        this.eventListener();
      });

      // Imposta un timeout di sicurezza per rimuovere il loader dopo un certo tempo
      setTimeout(() => {
        this.forceRemoveLoader();
      }, environment.loadingTime + 5000); // Aggiungi un tempo di buffer se necessario
    }
  }

  // Rileva dispositivi Apple
  detectAppleDevice(): void {
    // Controllo se il dispositivo è un iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    // Controllo se il dispositivo è un MacOS con touchscreen (es. MacBook)
    const isMacOS =
      /Macintosh/.test(navigator.userAgent) &&
      (navigator.maxTouchPoints ? navigator.maxTouchPoints > 1 : false);

    // Assegna la variabile booleana per i dispositivi Apple
    this.isAppleDevice = isIOS || isMacOS;

    // Log dell'informazione
    LOG.info(`Detected Apple Device: ${this.isAppleDevice}`, 'Detecting OS');
  }

  // Funzione di animazione per tutti i dispositivi
  eventListener(): void {
    const loader = document.getElementById('loader');
    setTimeout(() => {
      if (loader) {
        let loaderOpacity = 1;
        const fadeAnimation = setInterval(() => {
          if (loaderOpacity <= 0.05) {
            clearInterval(fadeAnimation);
            loader.style.opacity = '0';
            loader.style.display = 'none';
          } else {
            loader.style.opacity = loaderOpacity.toString();
            loader.style.filter = `alpha(opacity=${loaderOpacity * 100})`;
            loaderOpacity -= loaderOpacity * 0.5;
          }
        }, 30);
      }
    }, environment.loadingTime);
  }

  // Rimuove il loader forzatamente dopo un timeout di sicurezza
  forceRemoveLoader(): void {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.style.opacity = '0';
      loader.style.display = 'none';
      this.animation.isLoading = false; // Assicurati che l'animazione sia considerata terminata
    }
  }
}
