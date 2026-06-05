import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { CatsRepository } from './cats.repository';
import { ConsoleLoggerService } from '../logger/console-logger.service';
import { CacheService } from '../cache/cache.service';
import { TransientService } from '../transient/transient.service';
import { APP_CONFIG, CACHE_SERVICE, LOGGER } from 'src/common/token';

@Module({
  imports: [],
  controllers: [CatsController],
  providers: [
    CatsService,
    CatsRepository,
    {
      provide: APP_CONFIG,
      useValue: {
        appName: 'Cats App',
        enableCache: true,
        enableLogging: true,
      },
    },
    {
      provide: LOGGER,
      useClass: ConsoleLoggerService,
    },
    {
      provide: CACHE_SERVICE,
      useFactory: (
        appConfig: { enableCache: boolean },
        logger: { log(message: string): void },
      ) => {
        return new CacheService(appConfig, logger);
      },
      inject: [APP_CONFIG, LOGGER],
    },
    // RequestContextService,
    TransientService,
  ],
})
export class CatsModule {}
