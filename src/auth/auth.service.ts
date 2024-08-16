import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashService } from 'src/hash/hash.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private usersService: UsersService,
    private readonly hashService: HashService,
  ) {}

  async validatePassword(username: string, password: string) {
    const user = await this.usersService.findOne(username);
    if (user && (await this.hashService.isMatch(password, user.password))) {
      return user;
    } else {
      throw new UnauthorizedException('Username or password is invalid');
    }
  }

  async signin(userId: number) {
    const token = await this.jwtService.signAsync({ sub: userId });
    return { access_token: token };
  }
}
