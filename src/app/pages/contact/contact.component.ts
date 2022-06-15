import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailSenderService } from 'src/app/shared/services/email.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  @ViewChild('name') name_el!: ElementRef;
  @ViewChild('email') email_el!: ElementRef;
  @ViewChild('message') message_el!: ElementRef;
  constructor(private sender: EmailSenderService) {}

  validateForm(): boolean {
    if (
      this.name_el != undefined &&
      this.email_el != undefined &&
      this.message_el != undefined
    ) {
      return true;
    } else {
      return false;
    }
  }

  sendEmail() {
    const name = this.name_el.nativeElement.value;
    const email = this.email_el.nativeElement.value;
    const message = this.message_el.nativeElement.value;
    this.sender.sendEmail(name, email, message);
  }

  ngOnInit(): void {}
}
