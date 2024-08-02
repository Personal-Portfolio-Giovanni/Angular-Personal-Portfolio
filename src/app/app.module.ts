import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ProfileComponent } from './pages/homepage/profiles/profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DescriptionComponent } from './pages/homepage/description/description.component';
import { HeaderComponent } from './core/header/header.component';
import { WorkSectionComponent } from './pages/homepage/works-section/works-section.component';
import { FooterComponent } from './core/footer/footer.component';
import { LanguagesComponent } from './pages/homepage/languages/languages.component';
import { LanguageComponent } from './pages/homepage/languages/language/language.component';
import { CourseSectionComponent } from './pages/homepage/course-section/course-section.component';
import { TitleSectionComponent } from './shared/components/title-section/title-section.component';
import { AccordionContentComponent } from './shared/components/accordion-content/accordion-content.component';
import { InfoSectionComponent } from './core/info-section/info-section.component';
import { PersonalProjectComponent } from './pages/homepage/personal-project/personal-project.component';
import { CardFlipComponent } from './shared/components/card-flip/card-flip.component';
import { ContactComponent } from './pages/homepage/contact/contact.component';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from './interceptors/loading/loading.component';
import { ProjectComponent } from './pages/project/project.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { AppRoutingModule } from './app-routing.module';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { CardFlipElegantComponent } from './shared/components/card-flip-elegant/card-flip-elegant.component';
import { SkillCardComponent } from './shared/components/skill-card/skill-card.component';
import { ProfileMinimalComponent } from './pages/homepage/profiles/profile-minimal/profile-minimal.component';

@NgModule({ declarations: [
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
        ProjectComponent,
        HomepageComponent,
        CardFlipElegantComponent,
        SkillCardComponent,
        ProfileMinimalComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        AppRoutingModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            // Register the ServiceWorker as soon as the app is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:10000',
        }),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        })], providers: [
        LoadingComponent,
        TitleSectionComponent,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoaderInterceptor,
            multi: true,
        },
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AppModule {}
// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(
    http,
    environment.baseUrl + 'assets/i18n/',
    '.json'
  );
}
