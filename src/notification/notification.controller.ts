/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Sse } from '@nestjs/common';
import { NotificationService } from './notification.service';

import { interval, map, Observable, pipe, switchMap } from 'rxjs';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Sse('sse')
  sse(): Observable<any> {
    return interval(100000).pipe(
      switchMap(() => this.notificationService.getNotification()),
      map((p) => ({
        data: p,
      })),
    );
  }
}
