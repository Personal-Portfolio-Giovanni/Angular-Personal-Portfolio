import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
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
  public name: string = '';
  public message: string = '';
  public emailSender?: EmailSenderModel;

  constructor(private http: HttpClient) {}

  async sendEmail(
    name: string,
    email: string,
    message: string
  ): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const call: any = this.http
        .post(environment.emailSenderUrl, {
          name,
          email,
          message,
        })
        .subscribe((data: any) => {
          this.isSent = data.ok;
        });
      resolve(this.isSent);
    });
  }

  async herokuSendEmail(
    emailSenderModel: EmailSenderModel,
    message: string,
    name: string
  ): Promise<EmailResponseModel | ErrorResponse> {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'X-Requested-With');
    headers.append('Content-Type', 'application/json');

    return new Promise<EmailResponseModel | ErrorResponse>(
      (resolve, reject) => {
        const call: any = this.http
          .post(
            environment.herokuEmailSenderUrl + this.PARAMS,
            emailSenderModel,
            {
              headers: headers,
            }
          )
          //.pipe(catchError(this.handleError))
          .subscribe((data: any) => {
            this.emailResponse = data;
          });
        resolve(this.emailResponse);
      }
    );
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
    this.sendEmail(
      localStorage.getItem('name')!,
      localStorage.getItem('email')!,
      localStorage.getItem('message')!
    );

    // Return an observable with a user-facing error message.
    return throwError(() => new Error(error.error.error.message));
  }
}
