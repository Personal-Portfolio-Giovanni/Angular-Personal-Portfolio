import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SwalIcon } from 'src/app/shared/class/accordion-constant.class';
import {
  EmailResponseModel,
  EmailSenderModel,
  EmailTemplateModel,
  TemplateConstant,
} from 'src/app/shared/class/emailSender.class';
import { ErrorResponse } from 'src/app/shared/class/error.class';
import { PortfolioData } from 'src/app/shared/class/portfolio.class';
import { EmailSenderService } from 'src/app/shared/services/api/email.service';
import { LOG } from 'src/app/shared/services/config/logger.service';
import { SwalService } from 'src/app/shared/services/config/swal.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  @Input('portfolio') portfolio?: PortfolioData;

  env = environment;
  name!: string;
  email!: string;
  message!: string;
  emailTemplate?: EmailTemplateModel;
  emailResponse?: EmailResponseModel;
  errorResponse?: ErrorResponse;

  yearExperience?: number;

  constructor(
    private sender: EmailSenderService,
    private translate: TranslateService,
    private swalService: SwalService
  ) {}

  validateEmailFormat(email: string): boolean {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  }

  confirmSend() {
    this.swalService
      .confirmDialog(
        this.translate
          .instant('contact.send_email.title')
          .replace('$NAME$', this.name),
        '',
        this.translate.instant('contact.send_email.send'),
        this.translate.instant('contact.send_email.not_send')
      )
      .then(async (result: any) => {
        if (result.isConfirmed) {
          this.serverSendEmail();
          this.resetForm();
        } else if (result.isDenied) {
          this.swalService.simpleDialog(
            SwalIcon.INFO,
            this.translate.instant('contact.send_email.not_send_error'),
            ''
          );
        }
      });
  }

  sendEmail() {
    this.sender.sendEmail(this.name, this.email, this.message).subscribe({
      next: (v: any) => {
        this.swalService.simpleDialog(
          SwalIcon.SUCCESS,
          this.translate.instant('contact.send_email.send_success'),
          ''
        );
        LOG.info(
          'Email to ' + this.email + ' is sucessfully send!',
          'Formspree Email Sender'
        );
      },
      error: (e) => {
        this.swalService.simpleDialog(
          SwalIcon.INFO,
          this.translate.instant('contact.send_email.not_send_error'),
          ''
        );
        LOG.info(
          'Error on sending Email to ' + this.email + '!',
          'Formspree Email Sender'
        );
      },
    });
  }

  serverSendEmail(): any {
    let locale = localStorage.getItem('profile_language');
    //let email = this.sender.getEmailTemplate();
    this.emailTemplate = this.sender.emailTemplates.find(
      (e: any) => e.locale === locale
    );

    let content = this.emailTemplate?.content
      ?.replace(TemplateConstant.EMAIL_NAME, this.name)
      .replace(TemplateConstant.EMAIL_COPY, this.message)
      .replace(TemplateConstant.SITE_SHORT, 'giovannilamarmora.github.io');
    LOG.info('Building content for email sender', 'ContactComponent');

    let emailSender: EmailSenderModel = new EmailSenderModel();
    emailSender.to = this.email;
    emailSender.bbc = environment.senderEmail;
    emailSender.replyTo = environment.senderEmail;
    emailSender.sentDate = new Date();
    emailSender.subject = this.emailTemplate?.subject;
    emailSender.text = content;

    LOG.info(content!, 'ContactComponent');

    let response: any;

    this.sender.serverSendEmail(emailSender).subscribe({
      next: (v: any) => {
        this.swalService.simpleDialog(
          SwalIcon.SUCCESS,
          this.translate.instant('contact.send_email.send_success'),
          ''
        );
        return v;
      },
      error: (e) => {
        this.sendEmail();
        return e;
      },
    });
    return response;
  }

  ageCalc(): number {
    const birthdayDate: Date = new Date(
      this.translate.instant('profile.birthdayDate')
    );
    const nowDate: Date = new Date();
    var ynew = nowDate.getFullYear();
    var mnew = nowDate.getMonth();
    var dnew = nowDate.getDate();
    var yold = birthdayDate.getFullYear();
    var mold = birthdayDate.getMonth();
    var dold = birthdayDate.getDate();
    var diff = ynew - yold;
    if (mold > mnew) diff--;
    else {
      if (mold == mnew) {
        if (dold > dnew) diff--;
      }
    }
    return diff;
  }

  resetForm() {
    this.name = '';
    this.email = '';
    this.message = '';
  }

  ngOnInit(): void {
    this.sender.getEmailTemplate();
    this.yearExperience = this.calculateYearsElapsed();
  }

  calculateYearsElapsed(): number {
    // Reference date (June 11, 2021)
    const referenceDate: Date = new Date('2021-06-11T00:00:00');

    // Current date
    const currentDate: Date = new Date();

    // Calculate the difference in milliseconds between the two dates
    const timeDifferenceInMillis: number =
      currentDate.getTime() - referenceDate.getTime();

    // Calculate the number of milliseconds in a year (approximate)
    const millisecondsInYear: number = 365.25 * 24 * 60 * 60 * 1000;

    // Calculate the number of elapsed years rounding down
    const yearsElapsed: number = Math.floor(
      timeDifferenceInMillis / millisecondsInYear
    );

    return yearsElapsed;
  }
}
