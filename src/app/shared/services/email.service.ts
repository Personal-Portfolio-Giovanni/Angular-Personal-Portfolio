import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import {
  EmailResponseModel,
  EmailSenderModel,
  EmailTemplateModel,
} from '../class/emailSender.class';
import { ErrorResponse } from '../class/error.class';

@Injectable({
  providedIn: 'root',
})
export class EmailSenderService {
  environment = environment;
  public isSent: boolean = false;
  public emailResponse: EmailResponseModel = new EmailResponseModel();
  public emailTemplate: EmailTemplateModel = new EmailTemplateModel();
  private PARAMS: string = '?htmlText=true';
  public errorResponse: ErrorResponse = new ErrorResponse();

  constructor(private http: HttpClient) {}

  sendEmail(name: string, email: string, message: string): boolean {
    this.http
      .post(environment.emailSenderUrl, {
        name,
        email,
        message,
      })
      .subscribe({
        next: (v: any) => {
          this.isSent = v.ok;
          return this.isSent;
        },
        error: (e) => {
          this.isSent = false;
          return this.isSent;
        },
      });
    return this.isSent;
  }

  herokuSendEmail(
    emailSenderModel: EmailSenderModel
  ): EmailResponseModel | ErrorResponse {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'X-Requested-With');
    headers.append('Content-Type', 'application/json');

    const call: any = this.http
      .post(environment.herokuEmailSenderUrl + this.PARAMS, emailSenderModel, {
        headers: headers,
      })
      //.pipe(catchError(this.handleError))
      .subscribe({
        next: (v: EmailResponseModel) => {
          this.emailResponse.timestamp = v.timestamp;
          this.emailResponse.message = v.message;
          return v;
        },
        error: (e) => {
          this.errorResponse.correlationId = e.error.correlationId;
          this.errorResponse.dateTime = e.error.dateTime;
          this.errorResponse.url = e.url;
          this.errorResponse.error = e.error.error;
          return e;
        },
        complete: () => console.info('complete'),
      });
    return this.emailResponse?.message != null
      ? this.emailResponse!
      : this.errorResponse!;
  }

  getEmailTemplate(): EmailTemplateModel {
    this.http.get(environment.templatePath).subscribe((data) => {
      this.emailTemplate = data;
    });
    return this.emailTemplate!;
  }

  private handleError(error: HttpErrorResponse) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.error.error.message,
    });

    // Return an observable with a user-facing error message.
    return throwError(() => new Error(error.error.error.message));
  }
}
