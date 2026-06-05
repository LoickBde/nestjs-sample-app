import { Controller, Get, Param } from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(
    private catsService: CatsService,
    // private requestContextService: RequestContextService,
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

  // @Get('debug/request-id')
  // getRequestId() {
  //   return {
  //     requestId: this.requestContextService.getRequestId(),
  //   };
  // }
}
