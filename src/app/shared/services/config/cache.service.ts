import { Injectable } from '@angular/core';
import { Observable, switchMap, timer } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Utils } from './utils.service';
import { LOG } from './logger.service';
import { PortfolioConstant, PortfolioData } from '../../class/portfolio.class';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  environment = environment;
  private cacheTimeout: number = environment.cacheTimeout;

  // Portfolio Data
  private portfolioCache: Map<string, any> = new Map();

  constructor() {
    timer(0, this.cacheTimeout)
      .pipe(switchMap(() => this.clearCacheObservable()))
      .subscribe();
  }

  clearCacheObservable(): Observable<any> {
    this.clearCache();
    return new Observable((observer) => {
      observer.next(null);
      observer.complete();
    });
  }

  clearCache(): any {
    LOG.info('Deleting cache...', 'Cache Service');
    this.portfolioCache = new Map();
  }

  getPortfolioDataCache(locale: string) {
    let data = Utils.copyObject(this.portfolioCache.get(locale));
    if (Utils.isNullOrEmpty(data)) {
      let lastUpdate: any = localStorage.getItem(
        PortfolioConstant.LAST_UPDATE + '_' + locale
      );
      let today = new Date();

      // Timer di 24 ore 86400000
      let lastUpdateDate = new Date(lastUpdate);
      let isUpdate =
        lastUpdateDate != undefined
          ? lastUpdateDate.getTime() + this.cacheTimeout > today.getTime()
          : false;

      if (isUpdate) {
        const response = {
          data: JSON.parse(
            localStorage.getItem(
              PortfolioConstant.PORTFOLIO_DATA + '_' + locale
            )!
          ),
        };
        if (Utils.isNullOrEmpty(response.data)) return null;
        return response;
      }
    }

    if (Utils.isNullOrEmpty(data)) return null;

    const response = {
      data: data,
    };
    return response;
  }

  cachePortfolioData(portfolio: PortfolioData, locale: string) {
    if (
      this.isCacheEnabled() &&
      !Utils.isNullOrEmpty(portfolio) &&
      !portfolio.cached
    ) {
      LOG.info('Caching data for locale ' + locale, 'Cache Service');
      portfolio.cached = true;
      this.portfolioCache.set(locale, Utils.copyObject(portfolio));
      localStorage.setItem(
        PortfolioConstant.LAST_UPDATE + '_' + locale,
        new Date().toISOString()
      );
      localStorage.setItem(
        PortfolioConstant.PORTFOLIO_DATA + '_' + locale,
        JSON.stringify(portfolio)
      );
    }
  }

  isCacheEnabled() {
    try {
      return Boolean(JSON.parse(environment.cacheEnable.toString()));
    } catch (e: any) {
      return false;
    }
  }
}
