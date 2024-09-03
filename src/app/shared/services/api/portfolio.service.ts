import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CacheService } from '../config/cache.service';
import { PortfolioProject } from '../../class/portfolio.class';
import { Utils } from '../config/utils.service';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  environment = environment;
  // Ho bisogno del passaggio dati dei progetti dopo la chiamata a getPortfolioDataCache
  public static portfolioProjects: Array<PortfolioProject> = [];
  public portfolioProjects: Array<PortfolioProject> = [];

  constructor(private http: HttpClient, public cache: CacheService) {}

  getPortfolioData(locale: string): Observable<any> {
    if (!Utils.isNullOrEmpty(this.cache.getPortfolioDataCache(locale)))
      return of(this.cache.getPortfolioDataCache(locale));

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const url = environment.portfolioData + '?locale=' + locale;
    return this.http.get(url, { headers: headers });
  }
}
