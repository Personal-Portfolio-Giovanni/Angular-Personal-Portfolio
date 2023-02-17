import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { CMSData, Contentful } from '../class/colorful.class';
import {
  EmailResponseModel,
  EmailSenderModel,
  EmailTemplateModel,
} from '../class/emailSender.class';
import { ErrorResponse } from '../class/error.class';

@Injectable({
  providedIn: 'root',
})
export class ContentfulService {
  environment = environment;
  public worksData: CMSData[] = [];
  public courseData: CMSData[] = [];
  public projectData: CMSData[] = [];

  constructor(private http: HttpClient) {}

  getCMSData(locale: string): Observable<any> {
    let headers = new HttpHeaders({
      Authorization: 'Bearer _CF0iFOve3oKWY63R9EhELmLrLsPGSzMBCz9X9EISe4',
    });

    const url =
      environment.contentfulBaseUrl +
      environment.worksUrl +
      '?locale=' +
      locale;
    return this.http.get(url, { headers: headers });
  }
}
