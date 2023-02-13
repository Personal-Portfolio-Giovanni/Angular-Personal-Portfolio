import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CMSData } from 'src/app/shared/class/colorful.class';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  @Output('changeLanguagesWorkSection') changeLanguagesWorkSection =
    new EventEmitter<Array<CMSData>>();
    @Output('changeLanguagesCourseSection') changeLanguagesCourseSection =
    new EventEmitter<Array<CMSData>>();

  environment = environment;
  fullName: string = 'Giovanni Lamarmora';
  email: string = 'giovannilamarmora.working@gmail.com';

  words = ['Java Developer', 'Web Developer', 'Full Stack Developer'];
  id = 'text';
  colors = ['white'];
  constructor() {}

  scrollTo(element: any): void {
    (document.getElementById(element) as HTMLElement).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }

  ngOnInit(): void {
    this.consoleText(this.words, this.id, this.colors);
  }

  changeLanguagesWork(works: Array<CMSData>) {
    this.changeLanguagesWorkSection.emit(works);
  }

  changeLanguagesCourse(courses: Array<CMSData>) {
    this.changeLanguagesCourseSection.emit(courses);
  }

  consoleText(words: Array<string>, id: string, colors: Array<string>) {
    if (colors === undefined) colors = ['#fff'];
    var visible = true;
    var con = document.getElementById('console');
    var letterCount = 1;
    var x = 1;
    var waiting = false;
    var target = document.getElementById(id);
    if (target != null) {
      target.setAttribute('style', 'color:' + colors[0]);
      window.setInterval(function () {
        if (letterCount === 0 && waiting === false && target != null) {
          waiting = true;
          target.innerHTML = words[0].substring(0, letterCount);
          window.setTimeout(function () {
            var usedColor = colors.shift();
            var usedWord = words.shift();
            if (
              usedColor != undefined &&
              target != null &&
              usedWord != undefined
            ) {
              colors.push(usedColor);
              words.push(usedWord);
              x = 1;
              target.setAttribute('style', 'color:' + colors[0]);
              letterCount += x;
              waiting = false;
            }
          }, 1000);
        } else if (letterCount === words[0].length + 1 && waiting === false) {
          waiting = true;
          window.setTimeout(function () {
            x = -1;
            letterCount += x;
            waiting = false;
          }, 1000);
        } else if (waiting === false && target != null) {
          target.innerHTML = words[0].substring(0, letterCount);
          letterCount += x;
        }
      }, 120);
      window.setInterval(function () {
        if (visible === true && con != null) {
          con.className = 'console-underscore hidden';
          visible = false;
        } else {
          if (con != null) {
            con.className = 'console-underscore';
            visible = true;
          }
        }
      }, 400);
    }
  }
}
