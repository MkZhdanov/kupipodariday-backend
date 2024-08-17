import { Entity, Column, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../utils/entities/base.entities';
import { IsString, Length, IsUrl, Max } from 'class-validator';
import { Wish } from 'src/wishes/entities/wish.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Wishlist extends BaseEntity {
  @Column()
  @Length(1, 250)
  @IsString()
  name: string;

  @Column({ default: '' })
  @IsString()
  @Max(1500)
  description: string;

  @Column()
  @IsUrl()
  image: string;

  @ManyToMany(() => Wish, (wish) => wish.name)
  @JoinTable()
  items: Wish[];

  @ManyToOne(() => User, (user) => user.wishlists)
  owner: User;
}
