import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoController } from './crypto/crypto.controller';
import { CryptoService } from './crypto/crypto.service';
import { Crypto } from './crypto/crypto.entity';
import { CryptoModule } from './crypto/crypto.module';
import { ScheduleModule } from '@nestjs/schedule';
import { WatchlistController } from './watchlist/watchlist.controller';
import { WatchlistService } from './watchlist/watchlist.service';
import { WatchlistModule } from './watchlist/watchlist.module';
import { Watchlist } from './watchlist/watchlist.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'acidball',
      password: 'acidball',
      database: 'cryptonotification',
      entities: [Crypto, Watchlist],
      synchronize: true,
    }),
    CryptoModule,
    ScheduleModule.forRoot(),
    WatchlistModule,
  ],
  controllers: [AppController, CryptoController, WatchlistController],
  providers: [AppService, CryptoService, WatchlistService],
})
export class AppModule {}
