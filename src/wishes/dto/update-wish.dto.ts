import { PartialType } from '@nestjs/swagger';
import { CreateWishDto } from './create-wish.dto';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateWishDto extends PartialType(CreateWishDto) {
  @IsNumber()
  @Min(0)
  @IsOptional()
  raised: number;
}
