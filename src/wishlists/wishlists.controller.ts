import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { AuthUser, AuthUserId } from 'src/utils/decorators/user.decorator';
import { User } from 'src/users/entities/user.entity';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('wishlistlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Post()
  @UseGuards(JwtGuard)
  create(@Body() createWishlistDto: CreateWishlistDto, @AuthUser() user: User) {
    console.log(user);
    return this.wishlistsService.create(createWishlistDto, user);
  }

  @Get()
  findAll() {
    return this.wishlistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.wishlistsService.findById(id);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  update(
    @Param('id') wishId: number,
    @Body() updateWishlistDto: UpdateWishlistDto,
    @AuthUserId() userId: number,
  ) {
    return this.wishlistsService.update(wishId, updateWishlistDto, userId);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  remove(@Param('id') wishId: number, @AuthUserId() userId: number) {
    return this.wishlistsService.remove(wishId, userId);
  }
}
