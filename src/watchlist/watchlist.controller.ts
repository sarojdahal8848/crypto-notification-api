import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { CreateWatchListDTO } from './watchlist.dto';
import { Watchlist } from './watchlist.entity';
import { WatchlistService } from './watchlist.service';

@Controller('watchlist')
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}

  @Post()
  create(@Body() addDto: CreateWatchListDTO) {
    console.log('hello');
    return this.watchlistService.create(addDto);
  }

  @Get()
  paginate(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Query('search', new DefaultValuePipe('')) search: string = '',
  ): Promise<Pagination<Watchlist>> {
    limit = limit > 50 ? 50 : limit;
    return this.watchlistService.paginate(
      {
        page,
        limit,
        route: 'http://localhost:3000/crypto',
      },
      search,
    );
  }

  @Get('getAll')
  findAll() {
    return this.watchlistService.findAll();
  }
}
