import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class RequestContextService {
  constructor() {
    console.log('[RequestContextService] 🆕 Nouvelle instance créée !');
  }
  private readonly requestId = Math.random().toString(36).substring(2, 9);

  getRequestId() {
    return this.requestId;
  }
}
