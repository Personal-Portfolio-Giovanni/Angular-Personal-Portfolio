import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  environment = environment;
  LOG_Formatter: string = '[$DATE$] [$ENV$] [LOG]: $TEXT$';

  LOG(text: string): void {
    console.log(
      this.LOG_Formatter.replace('$DATE$', new Date().toDateString())
        .replace('$ENV$', environment.envType)
        .replace('$TEXT$', text)
    );
  }
}
