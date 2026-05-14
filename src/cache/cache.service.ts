import { Injectable } from '@nestjs/common';

@Injectable()
export class CacheService {
  constructor(
    private appConfig: { enableCache: boolean },
    private logger: { log(message: string): void },
  ) {}

  private cache = new Map<string, any>();

  set(key: string, value: any) {
    if (this.appConfig.enableCache) {
      this.cache.set(key, value);
      this.logger.log(`Cache set for key: ${key}`);
    }
  }

  get(key: string): any {
    if (this.appConfig.enableCache) {
      this.logger.log(`Cache retrieved for key: ${key}`);
      return this.cache.get(key);
    }
    return null;
  }

  has(key: string): boolean {
    if (this.appConfig.enableCache) {
      return this.cache.has(key);
    }
    return false;
  }
}
