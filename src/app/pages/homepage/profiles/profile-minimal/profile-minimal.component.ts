import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PortfolioData } from 'src/app/shared/class/portfolio.class';
import { Utils } from 'src/app/shared/services/config/utils.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile-minimal',
  templateUrl: './profile-minimal.component.html',
  styleUrls: ['./profile-minimal.component.css'],
})
export class ProfileMinimalComponent implements OnInit {
  @Output('changeLanguagesSection') changeLanguagesSection =
    new EventEmitter<PortfolioData>();

  @Input('portfolio') portfolio?: PortfolioData;
  environment = environment;

  fullName: string = 'Giovanni Lamarmora';
  private ATTR_LANGUAGE: string = 'profile_language';

  title: string =
    localStorage.getItem(this.ATTR_LANGUAGE) == 'it-IT'
      ? 'Lavoro con '
      : 'I work with ';
  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    moveEffect();
    this.renderText();
  }

  scrollTo(id: string) {
    Utils.scrollTo(id);
  }

  changeLanguages(portfolio: PortfolioData) {
    this.changeLanguagesSection.emit(portfolio);
    this.title =
      localStorage.getItem(this.ATTR_LANGUAGE) == 'it-IT'
        ? 'Lavoro con '
        : 'I work with ';
    //this.createTextElement();
    //this.renderText();
  }

  createTextElement(): void {
    // Rimuovi l'elemento esistente se presente
    let p = document.getElementById('text-animate');
    if (p) {
      p.remove();
    }

    // Crea un nuovo elemento <p> e aggiungilo al documento
    p = document.createElement('p');
    p.id = 'text-animate';
    p.style.fontSize = '24';
    p.style.display = 'block';
    p.style.position = 'relative';
    p.style.width = 'max-content';
    p.style.marginLeft = 'calc(50% - 170px)';
    p.style.color = 'aliceblue';
    p.style.textAlign = 'left';
    let sub = document.getElementById('subtitle');
    sub?.appendChild(p);
  }

  renderText() {
    let prefix: string = this.title;

    const skills: string[] = [
      'Spring Boot',
      'Java Reactor',
      'Angular',
      'TypeScript.',
      'JavaScript.',
      'HTML & CSS.',
    ].map((s: string) => `${s}`);
    const delay: number = 2;
    const step: number = 1;
    const tail: number = 5;
    const timeout: number = 75;

    const p = document.getElementById('text-animate');

    const colors: string[] = [
      'red',
      'green',
      'blue',
      'yellow',
      'cyan',
      'magenta',
    ];

    function getRandomColor(): string {
      return colors[Math.floor(Math.random() * colors.length)];
    }

    function getRandomChar(): string {
      return String.fromCharCode(Math.floor(Math.random() * (127 - 33) + 33));
    }

    function getRandomColoredString(n: number): DocumentFragment {
      const fragment: DocumentFragment = document.createDocumentFragment();
      for (let i = 0; i < n; i++) {
        const char: HTMLSpanElement = document.createElement('span');
        char.textContent = getRandomChar();
        char.style.color = getRandomColor();
        fragment.appendChild(char);
      }
      return fragment;
    }

    interface State {
      text: string;
      prefixP: number;
      skillI: number;
      skillP: number;
      direction: 'forward' | 'backward';
      delay: number;
      step: number;
    }

    const $: State = {
      text: '',
      prefixP: -tail,
      skillI: 0,
      skillP: 0,
      direction: 'forward',
      delay,
      step,
    };

    function render(): void {
      const skill: string = skills[$.skillI];

      if ($.step) {
        $.step--;
      } else {
        $.step = step;
        if ($.prefixP < prefix.length) {
          if ($.prefixP >= 0) {
            $.text += prefix[$.prefixP];
          }
          $.prefixP++;
        } else {
          if ($.direction === 'forward') {
            if ($.skillP < skill.length) {
              $.text += skill[$.skillP];
              $.skillP++;
            } else {
              if ($.delay) {
                $.delay--;
              } else {
                $.direction = 'backward';
                $.delay = delay;
              }
            }
          } else {
            if ($.skillP > 0) {
              $.text = $.text.slice(0, -1);
              $.skillP--;
            } else {
              $.skillI = ($.skillI + 1) % skills.length;
              $.direction = 'forward';
            }
          }
        }
      }

      p!.textContent = $.text;
      p!.appendChild(
        getRandomColoredString(
          $.prefixP < prefix.length
            ? Math.min(tail, tail + $.prefixP)
            : Math.min(tail, skill.length - $.skillP)
        )
      );
      setTimeout(render, timeout);
    }

    setTimeout(render, 500);
  }
}

function moveEffect() {
  document.addEventListener('DOMContentLoaded', () => {
    let mouseX: number;
    let mouseY: number;
    const ww: number = window.innerWidth;
    const wh: number = window.innerHeight;
    let traX: number;
    let traY: number;

    document.addEventListener('mousemove', (e: MouseEvent) => {
      mouseX = e.pageX;
      mouseY = e.pageY;
      traX = (4 * mouseX) / 570 + 40;
      traY = (4 * mouseY) / 570 + 50;
      document.querySelectorAll<HTMLElement>('.title').forEach((el) => {
        el.style.backgroundPosition = `${traX}% ${traY}%`;
      });
    });
  });
}
