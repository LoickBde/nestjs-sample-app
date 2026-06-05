import { Inject, Injectable } from '@nestjs/common';
import { APP_CONFIG } from 'src/common/token';

@Injectable()
export class ConsoleLoggerService {
  constructor(
    @Inject(APP_CONFIG)
    private appConfig: {
      appName: string;
      enableCache: boolean;
      enableLogging: boolean;
    },
  ) {}
  log(message: string) {
    if (this.appConfig.enableLogging)
      console.log(`[ ${this.appConfig.appName} LOG ] ${message}`);
  }
}
