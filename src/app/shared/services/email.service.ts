import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmailSenderService {
  constructor(private http: HttpClient) {}

  sendEmail(name: string, email: string, message: string) {
    return this.http
      .post('https://formspree.io/f/mqknjoak', {
        name,
        email,
        message,
      })
      .subscribe();
  }
}
