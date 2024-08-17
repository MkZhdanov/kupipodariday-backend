import { Module } from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { WishlistsController } from './wishlists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wish } from 'src/wishes/entities/wish.entity';
import { Wishlist } from './entities/wishlist.entity';
import { WishesService } from 'src/wishes/wishes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Wish, Wishlist])],
  controllers: [WishlistsController],
  providers: [WishlistsService, WishesService],
})
export class WishlistsModule {}
