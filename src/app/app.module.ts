import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ProfileComponent } from './profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DescriptionComponent } from './description/description.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { WorkSectionComponent } from './works-section/works-section.component';
import { WorkComponent } from './works-section/work/work.component';
import { FooterComponent } from './footer/footer.component';
import { LanguagesComponent } from './languages/languages.component';
import { LanguageComponent } from './languages/language/language.component';
import { CourseSectionComponent } from './course-section/course-section.component';
import { CourseComponent } from './course-section/course/course.component';
import { InfoSectionComponent } from './info-section/info-section.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    DescriptionComponent,
    HeaderComponent,
    WorkSectionComponent,
    WorkComponent,
    FooterComponent,
    LanguagesComponent,
    LanguageComponent,
    CourseSectionComponent,
    CourseComponent,
    InfoSectionComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
  providers: [],
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
