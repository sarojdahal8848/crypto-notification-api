import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
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
    try {
      return await this.watchlistRepository.upsert(addDto, ['code']);
    } catch (error) {
      return error.message;
    }
  }

  async findAll() {
    return await this.watchlistRepository.find();
  }

  async paginate(
    options: IPaginationOptions,
    search: string,
  ): Promise<Pagination<Watchlist>> {
    return paginate<Watchlist>(
      this.watchlistRepository
        .createQueryBuilder('watchlist')
        .where('watchlist.code ilike :code', { code: `%${search}%` }),
      options,
    );
  }
}
