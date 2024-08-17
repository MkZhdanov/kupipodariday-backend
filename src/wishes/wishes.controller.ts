import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { AuthUser, AuthUserId } from 'src/utils/decorators/user.decorator';
import { User } from 'src/users/entities/user.entity';
import { InvalidExceptionFilter } from 'src/filters/invalid-data-exception.filters';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@AuthUser() user: User, @Body() createWishDto: CreateWishDto) {
    console.log(user);
    return this.wishesService.create(createWishDto, user);
  }

  @Get('last')
  findLast() {
    return this.wishesService.findLast();
  }

  @Get('top')
  findTop() {
    return this.wishesService.findTop();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wishesService.findById(+id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  @UseFilters(InvalidExceptionFilter)
  update(
    @Param('id') wishId: number,
    @Body() updateWishDto: UpdateWishDto,
    @AuthUser() userId: number,
  ) {
    return this.wishesService.update(wishId, updateWishDto, userId);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(@Param('id') wishId: number, @AuthUserId() userId: number) {
    return this.wishesService.remove(wishId, userId);
  }

  @UseGuards(JwtGuard)
  @Post(':id/copy')
  copy(@Param('id') wishId: number, @AuthUser() user: User) {
    return this.wishesService.copy(wishId, user);
  }
}
