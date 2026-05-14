import { Inject, Injectable } from '@nestjs/common';
import { CatsRepository } from './cats.repository';
import { CacheService } from 'src/cache/cache.service';

@Injectable()
export class CatsService {
  constructor(
    private catsRepository: CatsRepository,

    @Inject('CACHE_SERVICE')
    private cacheService: CacheService,

    @Inject('APP_CONFIG')
    private appConfig: { appName: string; enableCache: boolean },

    @Inject('LOGGER')
    private logger: { log(message: string): void },
  ) {}

  findAll() {
    this.logger.log(`${this.appConfig.appName} - findAll called`);
    return this.catsRepository.findAll();
  }

  findOne(id: number) {
    const cacheKey = `cat_${id}`;

    if (this.cacheService.has(cacheKey)) {
      this.logger.log(`Cache hit for key: ${cacheKey}`);
      return this.cacheService.get(cacheKey);
    }

    this.logger.log(`Cache miss for key: ${cacheKey}`);

    const cat = this.catsRepository.findOne(id);
    this.cacheService.set(cacheKey, cat);

    return cat;
  }
}
