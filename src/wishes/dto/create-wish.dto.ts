import { IsNumber, IsString, IsUrl, Length, Min } from 'class-validator';

export class CreateWishDto {
  @Length(1, 200)
  @IsString()
  name: string;

  @IsString()
  link: string;

  @IsUrl()
  image: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price: number;

  @IsString()
  @Length(1, 1024)
  description: string;
}
