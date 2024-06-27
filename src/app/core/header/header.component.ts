import { animate, style, transition, trigger } from '@angular/animations';
import {
  Component,
  EventEmitter,
  HostListener,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  CMSData,
  ContentType,
  Contentful,
  ContentfulConstant,
  Item,
  Locale,
} from 'src/app/shared/class/colorful.class';
import { CMSService } from 'src/app/shared/services/api/cms.service';
import { environment } from '../../../environments/environment';
import { PortfolioService } from 'src/app/shared/services/api/portfolio.service';
import { Subscription } from 'rxjs';
import { LOG } from 'src/app/shared/services/config/logger.service';
import { LoggerService } from 'src/app/shared/services/config/log.service';
import { PortfolioData } from 'src/app/shared/class/portfolio.class';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ height: 0, opacity: 0, display: 'none' }),
        animate(
          '0.5s ease-out',
          style({ height: 300, opacity: 1, display: 'block' })
        ),
      ]),
      transition(':leave', [
        style({ height: 300, opacity: 1, display: 'block' }),
        animate(
          '0.5s ease-in',
          style({ height: 0, opacity: 0, display: 'none' })
        ),
      ]),
    ]),
  ],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private portfolioSubscribe: Subscription = new Subscription();
  portfolioData?: PortfolioData;
  @Output('changeLanguages') changeLanguages =
    new EventEmitter<PortfolioData>();

  @Output('changeLanguagesWork') changeLanguagesWork = new EventEmitter<
    Array<CMSData>
  >();
  @Output('changeLanguagesCourse') changeLanguagesCourse = new EventEmitter<
    Array<CMSData>
  >();
  @Output('changeLanguagesProject') changeLanguagesProject = new EventEmitter<
    Array<CMSData>
  >();
  @Output('changeLanguagesProfile') changeLanguagesProfile =
    new EventEmitter<CMSData>();
  environment = environment;
  downloadCV: boolean = false;
  firstname: string = 'Giovanni';
  lastname: string = 'Lamarmora';

  private ATTR_LANGUAGE: string = 'profile_language';
  private DEFAULT_LANGUAGE: string = 'en-GB';

  worksData: Array<CMSData> = [];
  coursesData: Array<CMSData> = [];
  projectsData: Array<CMSData> = [];
  profileData: CMSData = new CMSData();

  constructor(
    private translate: TranslateService,
    private cmsService: CMSService,
    private portfolioService: PortfolioService,
    private logger: LoggerService
  ) {
    //translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.setLanguages();
  }

  setLanguages() {
    let languages = localStorage.getItem(this.ATTR_LANGUAGE);
    if (!languages) languages = this.DEFAULT_LANGUAGE;
    this.changeLanguage(languages);
  }

  changeLanguage(lan: string) {
    this.translate.setDefaultLang(lan);
    localStorage.setItem(this.ATTR_LANGUAGE, lan);
    let languageIT = document.getElementById('italian') as HTMLElement;
    let languageEN = document.getElementById('english') as HTMLElement;
    if (lan == this.DEFAULT_LANGUAGE) {
      languageIT.classList.remove('active');
      languageEN.classList.add('active');
      this.checkAndGetCMSData(Locale.ENGLISH);
      this.checkAndGetPortfolioData(Locale.ENGLISH);
    } else {
      languageEN.classList.remove('active');
      languageIT.classList.add('active');
      this.checkAndGetCMSData(Locale.ITALIAN);
      this.checkAndGetPortfolioData(Locale.ITALIAN);
    }
  }

  checkAndGetCMSData(locale: Locale) {
    this.cmsService.getCMSData(locale).subscribe({
      next: (data: any) => {
        this.logger.LOG(data.message, 'Portfolio Service');
        let jobs: any[] = [];
        let courses: any[] = [];
        let projects: any[] = [];
        let profile: any;
        data.data.forEach((cmsData: any) => {
          if (cmsData.contentType == ContentType.WORKS) jobs.push(cmsData.data);
          else if (cmsData.contentType == ContentType.COURSE)
            courses.push(cmsData.data);
          else if (cmsData.contentType == ContentType.PROJECTS)
            projects.push(cmsData.data);
          else if (cmsData.contentType == ContentType.PROFILE)
            profile = cmsData.data[0];
        });
        this.worksData = jobs;
        this.coursesData = courses;
        this.projectsData = projects;
        this.setDataAndEmit(locale);
      },
      error: (e) => {
        this.checkCMSData(locale);
      },
    });
  }

  checkCMSData(locale: Locale) {
    let lastUpdate: any = localStorage.getItem(
      ContentfulConstant.LAST_UPDATE + '_' + locale
    );
    let works: Item = JSON.parse(
      localStorage.getItem(ContentfulConstant.WORKS_DATA + '_' + locale)!
    );
    let course: Item = JSON.parse(
      localStorage.getItem(ContentfulConstant.COURSE_DATA + '_' + locale)!
    );
    let projects: Item = JSON.parse(
      localStorage.getItem(ContentfulConstant.PROJECTS_DATA + '_' + locale)!
    );
    let profile: Item = JSON.parse(
      localStorage.getItem(ContentfulConstant.PROFILE_DATA + '_' + locale)!
    );

    let today = new Date();

    let isUpdate =
      new Date(lastUpdate) != undefined
        ? new Date(lastUpdate)?.getMilliseconds()! + 604800000 >
          today.getMilliseconds()
        : false;

    if (!isUpdate) {
      this.cmsService.getContentfulData(locale).subscribe({
        next: (data) => {
          this.logger.LOG('Successfully response', 'Contentful Service');
          this.worksData = this.buildWorks(data, ContentType.WORKS);
          this.coursesData = this.buildWorks(data, ContentType.COURSE);
          this.projectsData = this.buildWorks(data, ContentType.PROJECTS);
          this.profileData = this.buildWorks(data, ContentType.PROFILE)[0];
          this.setDataAndEmit(locale);
        },
      });
    } else {
      this.changeLanguagesWork.emit(this.worksData);
      this.changeLanguagesCourse.emit(this.coursesData);
      this.changeLanguagesProject.emit(this.projectsData);
      this.changeLanguagesProfile.emit(this.profileData);
      this.worksData = works.cmsData!;
      this.cmsService.worksData = works.cmsData!;
      this.coursesData = course.cmsData!;
      this.cmsService.courseData = course.cmsData!;
      this.projectsData = projects.cmsData!;
      this.cmsService.projectData = projects.cmsData!;
      this.profileData = profile.fields!;
      this.cmsService.profileData = profile.fields!;
    }
  }

  buildWorks(contentful: Contentful, contentId: string): Array<CMSData> {
    let works: Array<CMSData> = [];

    contentful.items
      ?.filter((i) => i.sys.contentType.sys.id === contentId)
      .forEach((item: Item) => {
        let cmsData: CMSData = new CMSData();
        cmsData.id = item.fields?.id;
        cmsData.title = item.fields?.title;
        cmsData.from = item.fields?.from;
        cmsData.to = item.fields?.to;
        cmsData.role = item.fields?.role;
        cmsData.where = item.fields?.where;
        cmsData.identifier = item.fields?.identifier;
        let description = '';
        item.fields?.descriptionValue?.content!.forEach((content: any) => {
          let index = 0;
          content.content?.forEach((content1: any) => {
            if (index == 0) {
              description = content1.value!;
            } else {
              description = description + '<br>' + content1.value;
            }
          });
        });
        cmsData.description = description;
        cmsData.titleSecondPage = item.fields?.titleSecondPage;
        cmsData.btn_href = item.fields?.btn_href;
        cmsData.btn_text = item.fields?.btn_text;
        cmsData.descriptionSecondPage = item.fields?.descriptionSecondPage;
        cmsData.img = item.fields?.img;
        // Profile
        cmsData.curriculumUrl = item.fields?.curriculumUrl;
        cmsData.city = item.fields?.city;
        cmsData.profilePhotoUrl = item.fields?.profilePhotoUrl;
        cmsData.biography = item.fields?.biography;
        cmsData.workProjects = item.fields?.workProjects;
        cmsData.personalProject = item.fields?.personalProject;
        cmsData.course = item.fields?.course;
        works.push(cmsData);
      });
    return works;
  }

  setDataAndEmit(locale: Locale) {
    let works: Item = new Item();
    works.cmsData = this.worksData;
    works.updatedAt = new Date();
    let course: Item = new Item();
    course.cmsData = this.coursesData;
    course.updatedAt = new Date();
    let projects: Item = new Item();
    projects.projectCmsData = this.projectsData;
    projects.updatedAt = new Date();
    let profile: Item = new Item();
    profile.fields = this.profileData;
    profile.updatedAt = new Date();
    localStorage.setItem(
      ContentfulConstant.LAST_UPDATE + '_' + locale,
      new Date().toISOString()
    );
    localStorage.setItem(
      ContentfulConstant.WORKS_DATA + '_' + locale,
      JSON.stringify(works)
    );
    localStorage.setItem(
      ContentfulConstant.COURSE_DATA + '_' + locale,
      JSON.stringify(course)
    );
    localStorage.setItem(
      ContentfulConstant.PROJECTS_DATA + '_' + locale,
      JSON.stringify(projects)
    );
    localStorage.setItem(
      ContentfulConstant.PROFILE_DATA + '_' + locale,
      JSON.stringify(profile)
    );
    this.changeLanguagesWork.emit(this.worksData);
    this.changeLanguagesCourse.emit(this.coursesData);
    this.changeLanguagesProject.emit(this.projectsData);
    this.changeLanguagesProfile.emit(this.profileData);
    this.worksData = works.cmsData!;
    this.cmsService.worksData = works.cmsData!;
    this.coursesData = course.cmsData!;
    this.cmsService.courseData = course.cmsData!;
    this.projectsData = projects.cmsData!;
    this.cmsService.projectData = projects.cmsData!;
    this.profileData = profile.fields!;
    this.cmsService.profileData = profile.fields!;
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let element = document.getElementById('navbar') as HTMLElement;
    if (window.pageYOffset > element.clientHeight) {
      element.classList.add('navbar-inverse');
    } else {
      element.classList.remove('navbar-inverse');
    }
  }

  checkAndGetPortfolioData(locale: Locale) {
    this.portfolioSubscribe = this.portfolioService
      .getPortfolioData(locale)
      .subscribe((res) => {
        this.portfolioService.cache.cachePortfolioData(res.data, locale);
        LOG.info(res.message!, 'HeaderComponent');
        this.portfolioData = res.data;
        this.changeLanguages.emit(res.data);
      });
  }

  ngOnDestroy(): void {
    this.portfolioSubscribe.unsubscribe();
  }
}
