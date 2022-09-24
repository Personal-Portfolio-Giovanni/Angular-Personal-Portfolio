import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EmailSenderService } from 'src/app/shared/services/email.service';
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
  constructor(
    private sender: EmailSenderService,
    private translate: TranslateService
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

  ngOnInit(): void {}
}
