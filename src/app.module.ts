import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/users.entity';
import { Cats } from './cats/cats.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '', // thay thế 'password' bằng mật khẩu của bạn
      database: 'learning_nest', // thay thế 'test' bằng tên database của bạn
      // entities: [User, Cats],
      synchronize: true,
      autoLoadEntities: true,
    }),
    // __dirname + '\\**\\*.entity{.ts,.js}'
    CatsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
