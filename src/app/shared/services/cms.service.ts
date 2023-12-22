import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CMSData } from '../class/colorful.class';

@Injectable({
  providedIn: 'root',
})
export class CMSService {
  environment = environment;
  public worksData: CMSData[] = [];
  public courseData: CMSData[] = [];
  public projectData: CMSData[] = [];
  public profileData: CMSData = new CMSData();

  constructor(private http: HttpClient) {}

  getContentfulData(locale: string): Observable<any> {
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

  getCMSData(locale: string): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const url = environment.portfolioCMSData + '?locale=' + locale;
    return this.http.get(url, { headers: headers });
  }
}
