import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ProfileComponent } from './pages/profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DescriptionComponent } from './pages/description/description.component';
import { HeaderComponent } from './core/header/header.component';
import { RouterModule } from '@angular/router';
import { WorkSectionComponent } from './pages/works-section/works-section.component';
import { FooterComponent } from './core/footer/footer.component';
import { LanguagesComponent } from './pages/languages/languages.component';
import { LanguageComponent } from './pages/languages/language/language.component';
import { CourseSectionComponent } from './pages/course-section/course-section.component';
import { TitleSectionComponent } from './shared/components/title-section/title-section.component';
import { AccordionContentComponent } from './shared/components/accordion-content/accordion-content.component';
import { InfoSectionComponent } from './core/info-section/info-section.component';
import { PersonalProjectComponent } from './pages/personal-project/personal-project.component';
import { CardFlipComponent } from './shared/components/card-flip/card-flip.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from './interceptors/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    DescriptionComponent,
    HeaderComponent,
    WorkSectionComponent,
    FooterComponent,
    LanguagesComponent,
    LanguageComponent,
    CourseSectionComponent,
    TitleSectionComponent,
    AccordionContentComponent,
    InfoSectionComponent,
    PersonalProjectComponent,
    CardFlipComponent,
    ContactComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot([]),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:10000',
    }),
    // ngx-translate and the loader module
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [LoadingComponent, TitleSectionComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(
    http,
    environment.baseUrl + 'assets/i18n/',
    '.json'
  );
}
