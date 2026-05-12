import { Inject, Injectable } from '@nestjs/common';
import { CatsRepository } from './cats.repository';

@Injectable()
export class CatsService {
  constructor(
    private catsRepository: CatsRepository,
    @Inject('APP_CONFIG')
    private appConfig: { appName: string; enableCache: string },
  ) {}

  findAll() {
    return this.catsRepository.findAll();
  }

  findOne(id: number) {
    return this.catsRepository.findOne(id);
  }
}
