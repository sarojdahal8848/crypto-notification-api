import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWatchListDTO } from './watchlist.dto';
import { Watchlist } from './watchlist.entity';

@Injectable()
export class WatchlistService {
  constructor(
    @InjectRepository(Watchlist)
    private watchlistRepository: Repository<Watchlist>,
  ) {}
  async create(addDto: CreateWatchListDTO) {
    return await this.watchlistRepository.save(addDto);
  }

  async findAll() {
    return await this.watchlistRepository.find();
  }
}
