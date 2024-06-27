import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CacheService } from '../config/cache.service';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  environment = environment;

  constructor(private http: HttpClient, public cache: CacheService) {}

  getPortfolioData(locale: string): Observable<any> {
    if (this.cache.getPortfolioDataCache(locale))
      return of(this.cache.getPortfolioDataCache(locale));

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const url = environment.portfolioData + '?locale=' + locale;
    return this.http.get(url, { headers: headers });
  }
}
