import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigFactory } from 'src/config/jwt.config';
import { HashModule } from 'src/hash/hash.module';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthController } from './auth.controller';
import config from 'src/config/config';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    HashModule,
    UsersModule,
    JwtModule.registerAsync({ useClass: JwtConfigFactory }),
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtConfigFactory, JwtStrategy, LocalStrategy],
})
export class AuthModule {}
