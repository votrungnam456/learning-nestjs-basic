import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Cats } from 'src/cats/cats.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Cats])],
  controllers: [UsersController],
  providers: [UserService],
  exports: [TypeOrmModule],
})
export class UsersModule {}
