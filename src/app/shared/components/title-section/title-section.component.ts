import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title-section',
  templateUrl: './title-section.component.html',
  styleUrls: ['./title-section.component.scss'],
})
export class TitleSectionComponent {
  @Input('class') class: string = '';
  @Input('title') title: string = '';
  @Input('sub_title') sub_title: string = '';

  fadeInSubTitle = true;

  switchText(): void {
    const titleElement = document.getElementById(this.title) as HTMLElement;
    const subTitleElement = document.getElementById(
      this.sub_title + '_sub'
    ) as HTMLElement;

    if (titleElement && subTitleElement) {
      if (titleElement.classList.contains('fade-in'))
        titleElement.classList.remove('fade-in');
      if (subTitleElement.classList.contains('fade-in-op'))
        subTitleElement.classList.remove('fade-in-op');
      // Aggiunge la classe fade-out per avviare la dissolvenza
      titleElement.classList.add('fade-out');
      subTitleElement.classList.add('fade-out');

      // Utilizza un timeout per completare la dissolvenza prima di cambiare il testo
      setTimeout(() => {
        // Scambia i testi tra titolo e sottotitolo
        const tempTitle = this.title;
        this.title = this.sub_title;
        this.sub_title = tempTitle;

        // Rimuove fade-out e aggiunge fade-in per l'animazione di apparizione
        titleElement.classList.remove('fade-out');
        subTitleElement.classList.remove('fade-out');
        titleElement.classList.add('fade-in');
        subTitleElement.classList.add('fade-in-op');
      }, 500); // Durata della transizione CSS
    }
  }
}
