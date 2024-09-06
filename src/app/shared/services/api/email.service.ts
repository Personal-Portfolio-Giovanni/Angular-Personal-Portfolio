import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import {
  EmailResponseModel,
  EmailSenderModel,
  EmailTemplateModel,
} from '../../class/emailSender.class';
import { ErrorResponse } from '../../class/error.class';

@Injectable({
  providedIn: 'root',
})
export class EmailSenderService {
  environment = environment;
  public isSent: boolean = false;
  public emailResponse: EmailResponseModel = new EmailResponseModel();
  public emailTemplates: any;
  private PARAMS: string = '?htmlText=true';
  public errorResponse: ErrorResponse = new ErrorResponse();

  constructor(private http: HttpClient) {}

  sendEmail(name: string, email: string, message: string): Observable<object> {
    return this.http.post(environment.emailSenderUrl, {
      name,
      email,
      message,
    });
  }

  serverSendEmail(
    emailSenderModel: EmailSenderModel
  ): Observable<EmailResponseModel | ErrorResponse> {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'X-Requested-With');
    headers.append('Content-Type', 'application/json');

    return this.http.post(
      environment.serverEmailSenderUrl + this.PARAMS,
      emailSenderModel,
      {
        headers: headers,
      }
    );
  }

  /* Non completo, manca implementazione lato server */
  serverSendEmailWithTemplateID(
    emailSenderModel: EmailSenderModel,
    templateId: string
  ): Observable<EmailResponseModel | ErrorResponse> {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'X-Requested-With');
    headers.append('Content-Type', 'application/json');

    return this.http.post(
      environment.serverEmailSenderUrl + '/' + templateId + this.PARAMS,
      emailSenderModel,
      {
        headers: headers,
      }
    );
  }

  getEmailTemplate(): Array<EmailTemplateModel> {
    this.http.get(environment.templatePath).subscribe((data) => {
      this.emailTemplates = data;
    });
    return this.emailTemplates!;
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
