import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateWatchListDTO } from './watchlist.dto';
import { WatchlistService } from './watchlist.service';

@Controller('watchlist')
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}

  @Post()
  create(@Body() addDto: CreateWatchListDTO) {
    return this.watchlistService.create(addDto);
  }

  @Get()
  findAll() {
    return this.watchlistService.findAll();
  }
}
