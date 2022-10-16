import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
export class CreateWatchListDTO {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsNumber()
  @IsNotEmpty()
  min_price: number;

  @IsNumber()
  @IsNotEmpty()
  max_price: number;
}
