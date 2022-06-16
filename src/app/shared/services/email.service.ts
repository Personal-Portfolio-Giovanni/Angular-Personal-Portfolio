import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmailSenderService {
  environment = environment;
  public isSent: boolean = false;
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
}
