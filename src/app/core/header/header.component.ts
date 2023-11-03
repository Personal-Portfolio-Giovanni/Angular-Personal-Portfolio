import { animate, style, transition, trigger } from '@angular/animations';
import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  CMSData,
  Contentful,
  ContentfulConstant,
  Item,
  Locale,
  ProjectCMSData,
} from 'src/app/shared/class/colorful.class';
import { ContentfulService } from 'src/app/shared/services/contentful.service';
import { environment } from '../../../environments/environment';

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
export class HeaderComponent implements OnInit {
  @Output('changeLanguagesWork') changeLanguagesWork = new EventEmitter<
    Array<CMSData>
  >();
  @Output('changeLanguagesCourse') changeLanguagesCourse = new EventEmitter<
    Array<CMSData>
  >();
  @Output('changeLanguagesProject') changeLanguagesProject = new EventEmitter<
    Array<CMSData>
  >();
  environment = environment;
  downloadCV: boolean = false;
  firstname: string = 'Giovanni';
  lastname: string = 'Lamarmora';

  private ATTR_LANGUAGE: string = 'profile_language';
  private DEFAULT_LANGUAGE: string = 'en-GB';

  worksData: Array<CMSData> = [];
  coursesData: Array<CMSData> = [];
  projectsData: Array<CMSData> = [];

  constructor(
    private translate: TranslateService,
    private contentService: ContentfulService
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
      this.checkCMSData(Locale.ENGLISH);
    } else {
      languageEN.classList.remove('active');
      languageIT.classList.add('active');
      this.checkCMSData(Locale.ITALIAN);
    }
  }

  checkCMSData(locale: Locale) {
    let works: Item = JSON.parse(
      localStorage.getItem(ContentfulConstant.WORKS_DATA + '_' + locale)!
    );
    let course: Item = JSON.parse(
      localStorage.getItem(ContentfulConstant.COURSE_DATA + '_' + locale)!
    );
    let projects: Item = JSON.parse(
      localStorage.getItem(ContentfulConstant.PROJECTS_DATA + '_' + locale)!
    );
    let today = new Date();
    let workUpdatedAt = new Date(
      works != null && works.updatedAt != null
        ? works.updatedAt!.toString()
        : ''
    );
    let courseUpdatedAt = new Date(
      course != null && course.updatedAt != null
        ? course.updatedAt!.toString()
        : ''
    );
    let projectUpdatedAt = new Date(
      projects != null && projects.updatedAt != null
        ? projects.updatedAt!.toString()
        : ''
    );
    let isWorkUpdate =
      workUpdatedAt?.getMilliseconds()! + 604800000 > today.getMilliseconds();
    let isCourseUpdate =
      courseUpdatedAt?.getMilliseconds()! + 604800000 > today.getMilliseconds();
    let isProjectUpdate =
      projectUpdatedAt?.getMilliseconds()! + 604800000 >
      today.getMilliseconds();

    if (
      works == null ||
      works == undefined ||
      course == null ||
      course == undefined ||
      isWorkUpdate ||
      isCourseUpdate ||
      isProjectUpdate
    ) {
      this.contentService.getCMSData(locale).subscribe({
        next: (data) => {
          this.worksData = this.buildWorks(data, 'jobs');
          this.coursesData = this.buildWorks(data, 'courses');
          this.projectsData = this.buildWorks(data, 'projects');
          let work: Item = new Item();
          work.cmsData = this.worksData;
          work.updatedAt = new Date();
          let course: Item = new Item();
          course.cmsData = this.coursesData;
          course.updatedAt = new Date();
          let project: Item = new Item();
          project.projectCmsData = this.projectsData;
          project.updatedAt = new Date();
          localStorage.setItem(
            ContentfulConstant.WORKS_DATA + '_' + locale,
            JSON.stringify(work)
          );
          localStorage.setItem(
            ContentfulConstant.COURSE_DATA + '_' + locale,
            JSON.stringify(course)
          );
          localStorage.setItem(
            ContentfulConstant.PROJECTS_DATA + '_' + locale,
            JSON.stringify(project)
          );
          this.contentService.worksData = work.cmsData!;
          this.contentService.courseData = course.cmsData!;
          this.contentService.projectData = project.cmsData!;
          this.changeLanguagesWork.emit(this.worksData);
          this.changeLanguagesCourse.emit(this.coursesData);
          this.changeLanguagesProject.emit(this.projectsData);
        },
      });
    } else {
      this.changeLanguagesWork.emit(this.worksData);
      this.changeLanguagesCourse.emit(this.coursesData);
      this.changeLanguagesProject.emit(this.projectsData);
      this.worksData = works.cmsData!;
      this.contentService.worksData = works.cmsData!;
      this.coursesData = course.cmsData!;
      this.contentService.courseData = course.cmsData!;
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
        works.push(cmsData);
      });
    return works;
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
}
