import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { CatsRepository } from './cats.repository';
import { ConsoleLoggerService } from 'src/logger/console-logger.service';
import { CacheService } from 'src/cache/cache.service';

@Module({
  imports: [],
  controllers: [CatsController],
  providers: [
    CatsService,
    CatsRepository,
    {
      provide: 'APP_CONFIG',
      useValue: {
        appName: 'Cats App',
        enableCache: true,
        enableLogging: true,
      },
    },
    {
      provide: 'LOGGER',
      useClass: ConsoleLoggerService,
    },
    {
      provide: 'CACHE_SERVICE',
      useFactory: (
        appConfig: { enableCache: boolean },
        logger: { log(message: string): void },
      ) => {
        return new CacheService(appConfig, logger);
      },
      inject: ['APP_CONFIG', 'LOGGER'],
    },
  ],
})
export class CatsModule {}
