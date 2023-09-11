import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';

@Injectable()
export class HealthService {
  healthCheck() {
    const status = {
      status: 'UP',
      timestamp: DateTime.fromISO(new Date().toISOString()).toISO(),
    };
    return status;
  }
}
