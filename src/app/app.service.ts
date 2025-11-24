import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth() {
    return {
      success: true,
      status: 'healthy',
      timestamp: new Date().toISOString(),
    };
  }
}
