import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { Repository } from 'typeorm';
import { WishesService } from 'src/wishes/wishes.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistRepository: Repository<Wishlist>,
    private readonly wishesService: WishesService,
  ) {}

  async create(createWishlistDto: CreateWishlistDto, user: User) {
    const { itemsId, ...rest } = createWishlistDto;
    const items = await this.wishesService.getManyByIds(itemsId);

    const wishlist = await this.wishlistRepository.save({
      items,
      owner: user,
      ...rest,
    });
    return wishlist;
  }

  findAll() {
    return (
      this.wishlistRepository.find({
        relations: ['owner', 'items'],
      }) || []
    );
  }

  async findById(id: number) {
    const wishlist = await this.wishlistRepository.findOne({
      where: { id },
      relations: ['owner', 'items'],
    });
    if (!wishlist) {
      throw new NotFoundException('Wishlist not found');
    }
    return wishlist;
  }

  async update(
    id: number,
    updateWishlistDto: UpdateWishlistDto,
    userId: number,
  ) {
    const wishlist = await this.findById(id);
    if (!wishlist) {
      throw new NotFoundException('Wishlist not found');
    }
    if (wishlist.owner.id !== userId) {
      throw new BadRequestException('You are not the owner of the wishlist');
    }
    const { itemsId, name, image } = updateWishlistDto;
    const wishes = await this.wishesService.getManyByIds(itemsId || []);

    await this.wishlistRepository.save({
      ...wishlist,
      name,
      image,
      items: wishes,
    });
    return await this.findById(id);
  }

  async remove(id: number, wishListId: number) {
    const wishlist = await this.wishlistRepository.findOne({
      where: { id },
      relations: ['owner', 'items'],
    });
    if (wishlist.owner.id !== wishListId) {
      throw new BadRequestException('You are not the owner of the wishlist');
    }
    await this.wishlistRepository.delete(id);
    return wishlist;
  }
}
