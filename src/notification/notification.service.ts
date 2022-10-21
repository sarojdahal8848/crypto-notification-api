import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Crypto } from 'src/crypto/crypto.entity';
import { Watchlist } from 'src/watchlist/watchlist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Crypto)
    private cryptoRepository: Repository<Crypto>,
    @InjectRepository(Watchlist)
    private watchlistRepository: Repository<Watchlist>,
  ) {}

  async getNotification() {
    const cryptoList = await this.cryptoRepository
      .createQueryBuilder('crypto')
      .leftJoinAndSelect(Watchlist, 'watchlist', 'watchlist.code=crypto.code')
      .where('crypto.code = watchlist.code')
      .andWhere(
        'CAST(crypto.price AS DECIMAL) < CAST(watchlist.min_price AS DECIMAL) OR CAST(crypto.price AS DECIMAL) > CAST(watchlist.max_price AS DECIMAL)',
      )
      .getMany();
    return cryptoList.map((val) => {
      const preSign = val._24h.split('')[0];
      return `${val.code} is on the move, The Price is ${
        preSign === '+' ? 'up' : 'down'
      } ${val._24h} in 24 hrs to $${val.price}`;
    });
  }
}
