import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WatchlistController } from './watchlist.controller';
import { Watchlist } from './watchlist.entity';
import { WatchlistService } from './watchlist.service';

@Module({
  imports: [TypeOrmModule.forFeature([Watchlist])],
  providers: [WatchlistService],
  controllers: [WatchlistController],
  exports: [TypeOrmModule],
})
export class WatchlistModule {}
