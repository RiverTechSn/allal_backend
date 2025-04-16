import { Injectable } from '@nestjs/common';
import { CryptoService } from './modules/database/crypto_service';

@Injectable()
export class AppService {
  constructor(
    private readonly crypto: CryptoService, // CryptoService
  ) {}
  getHello() {
    return this.crypto.createKey();
  }
}
