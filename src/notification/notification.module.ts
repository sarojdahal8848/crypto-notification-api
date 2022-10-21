import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { WatchlistService } from 'src/watchlist/watchlist.service';
import { WatchlistModule } from 'src/watchlist/watchlist.module';
import { CryptoModule } from 'src/crypto/crypto.module';

@Module({
  imports: [WatchlistModule, CryptoModule],
  controllers: [NotificationController],
  providers: [NotificationService, WatchlistService],
})
export class NotificationModule {}
