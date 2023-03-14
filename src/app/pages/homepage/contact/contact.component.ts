import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SwalIcon } from 'src/app/shared/class/accordion-constant.class';
import {
  EmailResponseModel,
  EmailSenderModel,
  EmailTemplateModel,
  TemplateConstant,
} from 'src/app/shared/class/emailSender.class';
import { ErrorResponse } from 'src/app/shared/class/error.class';
import { EmailSenderService } from 'src/app/shared/services/email.service';
import { LoggerService } from 'src/app/shared/services/log.service';
import { SwalService } from 'src/app/shared/services/swal.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  env = environment;
  name!: string;
  email!: string;
  message!: string;
  emailTemplate?: EmailTemplateModel;
  emailResponse?: EmailResponseModel;
  errorResponse?: ErrorResponse;
  constructor(
    private sender: EmailSenderService,
    private translate: TranslateService,
    private logger: LoggerService,
    private swalService: SwalService
  ) {}

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
          this.herokuSendEmail();
        } else if (result.isDenied) {
          this.swalService.simpleDialog(
            SwalIcon.INFO,
            this.translate.instant('contact.send_email.not_send_error'),
            ''
          );
        }
        this.resetForm();
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
      },
      error: (e) => {
        this.swalService.simpleDialog(
          SwalIcon.INFO,
          this.translate.instant('contact.send_email.not_send_error'),
          ''
        );
      },
    });

    this.logger.LOG(
      'Email to ' + this.email + ' is sucessfully send!',
      'Formspree Email Sender'
    );
  }

  herokuSendEmail(): any {
    //let email = this.sender.getEmailTemplate();
    this.emailTemplate = this.sender.emailTemplate;

    let title: string = this.translate.instant('email_content.title');
    let sub_title: string = this.translate.instant('email_content.sub-title');
    let important: string = this.translate.instant('email_content.important');
    let thanks: string = this.translate.instant('email_content.thanks');
    let content = this.emailTemplate.content
      ?.replace(
        TemplateConstant.TITLE,
        title.replace(TemplateConstant.NAME, this.name)
      )
      .replace(TemplateConstant.SUBTITLE, sub_title)
      .replace(TemplateConstant.EMAIL_TEXT, this.message)
      .replace(TemplateConstant.IMPORTANT_TEXT, important)
      .replace(TemplateConstant.THANKS, thanks);
    this.logger.LOG('Building content for email sender', 'ContactComponent');

    let emailSender: EmailSenderModel = new EmailSenderModel();
    emailSender.to = this.email;
    emailSender.bbc = 'giovannilamarmora.working@gmail.com';
    emailSender.replyTo = 'giovannilamarmora.working@gmail.com';
    emailSender.sentDate = new Date();
    emailSender.subject = 'Contact Me [giovannilamarmora]';
    emailSender.text = content;

    this.logger.LOG(content!, 'ContactComponent');

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
  }
}
