import { IsString, IsNotEmpty } from 'class-validator';
export class CreateWatchListDTO {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  min_price: number;

  @IsString()
  @IsNotEmpty()
  max_price: number;
}
