import { Injectable } from '@nestjs/common';

@Injectable()
export class FancyLoggerService {
  log(message: string) {
    console.log(`[LOG 😺😺😺] ${message}`);
  }
}
