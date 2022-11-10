import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { catchError } from 'rxjs';
import {
  EmailResponseModel,
  EmailSenderModel,
  EmailTemplateModel,
  TemplateConstant,
} from 'src/app/shared/class/emailSender.class';
import { ErrorResponse } from 'src/app/shared/class/error.class';
import { EmailSenderService } from 'src/app/shared/services/email.service';
import { LoggerService } from 'src/app/shared/services/log.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

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
    private logger: LoggerService
  ) {}

  confirmSend() {
    Swal.fire({
      title: this.translate
        .instant('contact.send_email.title')
        .replace('$NAME$', this.name),
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: this.translate.instant('contact.send_email.send'),
      denyButtonText: this.translate.instant('contact.send_email.not_send'),
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.herokuSendEmail();
        this.sendEmail();
      } else if (result.isDenied) {
        Swal.fire(
          this.translate.instant('contact.send_email.not_send_error'),
          '',
          'info'
        );
      }
    });
  }

  async sendEmail() {
    const isSentEmail: boolean = await this.sender.sendEmail(
      this.name,
      this.email,
      this.message
    );
    // TODO: Find a better way to handle this
    /* if (isSentEmail) { */
    Swal.fire(
      this.translate.instant('contact.send_email.send_success'),
      '',
      'success'
    );
    this.name = '';
    this.email = '';
    this.message = '';
    /* }  else {
      Swal.fire(
        this.translate.instant('contact.send_email.send_error'),
        '',
        'error'
      );
      this.name = '';
      this.email = '';
      this.message = '';
    }*/
  }

  async herokuSendEmail() {
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

    localStorage.setItem('name', this.name);
    localStorage.setItem('message', this.message);
    localStorage.setItem('email', emailSender.to);

    await this.sender.herokuSendEmail(emailSender, this.message, this.name);
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

  ngOnInit(): void {
    this.sender.getEmailTemplate();
  }
}
