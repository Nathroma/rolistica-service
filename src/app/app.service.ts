import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStatus() {
    return {
      success: true,
      status: 'healthy',
      timestamp: new Date().toISOString(),
    };
  }
}
