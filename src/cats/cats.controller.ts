import { Controller, Get, Param } from '@nestjs/common';
import { CatsService } from './cats.service';
import { TransientService } from '../transient/transient.service';

@Controller('cats')
export class CatsController {
  constructor(
    private catsService: CatsService,
    // private requestContextService: RequestContextService,
    private transientService: TransientService,
  ) {
    console.log('[CatsController] 🆕 Nouvelle instance créée !');
  }

  @Get()
  findAll() {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catsService.findOne(Number(id));
  }

  @Get('debug/calls/findAll')
  getFindAllCallsCount() {
    return { callsCount: this.catsService.getFindAllCallsCount() };
  }

  // @Get('debug/calls/requestContext')
  // getRequestContextCallsCount() {
  //   return {
  //     callsCount: this.requestContextService.getCallsCount(),
  //   };
  // }

  @Get('debug/transient')
  getTransientIds() {
    return {
      explication: 'Chacun a sa propre instance.',
      controllerTransientId: this.transientService.getInstanceId(),
      serviceTransientId: this.catsService.getTransientId(),
    };
  }
}
