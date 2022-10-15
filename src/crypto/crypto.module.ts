import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoController } from './crypto.controller';
import { Crypto } from './crypto.entity';
import { CryptoService } from './crypto.service';

@Module({
  imports: [TypeOrmModule.forFeature([Crypto])],
  providers: [CryptoService],
  controllers: [CryptoController],
  exports: [TypeOrmModule],
})
export class CryptoModule {}
