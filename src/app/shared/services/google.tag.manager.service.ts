import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GoogleTagManagerService {
  environment = environment;
  title: string = 'Giovanni Lamarmora | Portfolio';
  constructor(private titleTag: Title, private metaTag: Meta) {}

  setUpTag() {
    this.titleTag.setTitle(this.title);
    this.metaTag.addTags([
      {
        name: 'description',
        content:
          'Portfolio is the current website of Giovanni with all the working data and project, Check it out!',
      },
      { name: 'author', content: 'Giovanni Lamarmora' },
      {
        name: 'date',
        content: new Date().toLocaleDateString(),
        scheme: 'DD/MM/YYYY',
      },
      {
        name: 'keywords',
        content: 'Giovanni Lamarmora, Portfolio Giovanni Lamarmora',
      },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ]);
  }
}
