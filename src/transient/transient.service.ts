import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class TransientService {
  private readonly instanceId = Math.random().toString(36).substring(2, 9);

  constructor() {
    console.log(
      `[TransientService] 🆕 Instance créée avec l'ID : ${this.instanceId}`,
    );
  }

  getInstanceId() {
    return this.instanceId;
  }
}
