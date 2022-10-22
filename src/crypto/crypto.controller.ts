/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Crypto } from './crypto.entity';
import { CryptoService } from './crypto.service';

@Controller('crypto')
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {}
  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Query('search', new DefaultValuePipe('')) search: string = '',
  ): Promise<Pagination<Crypto>> {
    limit = limit > 50 ? 50 : limit;
    return this.cryptoService.paginate(
      {
        page,
        limit,
        route: 'http://localhost:3000/crypto',
      },
      search,
    );
  }

  // @Sse('sse')
  // sse(
  //   @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
  //   @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  //   @Query('search', new DefaultValuePipe('')) search: string = '',
  // ): Observable<any> {
  //   limit = limit > 50 ? 50 : limit;
  // return interval(10000).pipe(
  //   switchMap(() =>
  //     this.cryptoService.paginate(
  //       {
  //         page,
  //         limit,
  //         route: 'http://localhost:3000/crypto',
  //       },
  //       search,
  //     ),
  //   ),
  //   map((p) => ({
  //     data: p,
  //   })),
  // );
  // }
}
