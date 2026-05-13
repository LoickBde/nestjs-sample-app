import { Inject, Injectable } from '@nestjs/common';
import { CatsRepository } from './cats.repository';

@Injectable()
export class CatsService {
  constructor(
    private catsRepository: CatsRepository,

    @Inject('APP_CONFIG')
    private appConfig: { appName: string; enableCache: string },

    @Inject('LOGGER')
    private logger: { log(message: string): void },
  ) {}

  findAll() {
    this.logger.log(`${this.appConfig.appName} - findAll called`);
    return this.catsRepository.findAll();
  }

  findOne(id: number) {
    this.logger.log(`${this.appConfig.appName} - findOne called with id ${id}`);
    return this.catsRepository.findOne(id);
  }
}
