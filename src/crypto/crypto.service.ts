import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import puppeteer from 'puppeteer';
import { Repository } from 'typeorm';
import { Crypto } from './crypto.entity';
import { Cron, CronExpression } from '@nestjs/schedule';

import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class CryptoService {
  constructor(
    @InjectRepository(Crypto)
    private cryptoRepository: Repository<Crypto>,
  ) {}

  //   @Cron(CronExpression.EVERY_5_MINUTES)
  async create() {
    const cryptoListFunc = async () => {
      const browser = await puppeteer.launch({
        headless: false,
      });
      const page = await browser.newPage();
      await page.goto('https://coinranking.com/');

      const finalList = [];
      for (let i = 0; i < 1; i++) {
        const data = await page.evaluate(() => {
          const tbody = document.querySelector('.table > tbody');

          return Array.from(tbody.querySelectorAll('.table > tbody > tr')).map(
            (item) => {
              const image = item
                .querySelector('.profile__logo-background > img')
                ?.getAttribute('src');
              const name = item.querySelector(
                '.profile__name > a',
              ) as HTMLElement | null;
              const code = item.querySelector(
                '.profile__subtitle-name',
              ) as HTMLElement | null;
              const price = item.querySelector(
                '.table__cell.table__cell--2-of-8.table__cell--responsive > div',
              ) as HTMLElement | null;

              const market_cap = item.querySelector(
                '.table__cell.table__cell--2-of-8.table__cell--s-hide > div',
              ) as HTMLElement | null;
              const _24h = item.querySelector(
                '.table__cell.table__cell--1-of-8.table__cell--s-2-of-10.table__cell--right > div',
              ) as HTMLElement | null;
              return {
                image,
                name: name?.innerText,
                code: code?.innerText,
                price: price?.innerText,
                market_cap: market_cap?.innerText,
                _24h: _24h?.innerText,
              };
            },
          );
        });
        finalList.push(...data);

        await page.evaluate(() => {
          const el: HTMLAnchorElement = document.querySelector(
            '#__layout > div > div.coins.coins--dark > div:nth-child(3) > section > div:nth-child(3) > a',
          );
          el?.click();
        });

        await page.waitForSelector('.profile__name > a');
      }
      await browser.close();
      return finalList;
    };
    const cryptoList = await cryptoListFunc();
    return await this.cryptoRepository.upsert(cryptoList, ['code']);
  }

  async findAll() {
    return await this.cryptoRepository.findAndCount();
  }

  async paginate(
    options: IPaginationOptions,
    search: string,
  ): Promise<Pagination<Crypto>> {
    return paginate<Crypto>(
      this.cryptoRepository
        .createQueryBuilder('crypto')
        .where('crypto.name ilike :name', { name: `%${search}%` }),
      options,
    );
  }
}
