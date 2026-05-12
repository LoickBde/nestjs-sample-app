import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { CatsRepository } from './cats.repository';

@Module({
  imports: [],
  controllers: [CatsController],
  providers: [
    CatsService,
    CatsRepository,
    {
      provide: 'APP_CONFIG',
      useValue: { appName: 'Cats App', enableCache: 'true' },
    },
  ],
})
export class CatsModule {}
