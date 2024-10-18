import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER } from './config';
import { Like } from './likes/like.entity';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { LikesModule } from './likes/likes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: DB_HOST,
      port: DB_PORT,
      username: DB_USER,
      password: DB_PASS,
      database: DB_NAME,
      entities: [User, Like],
      synchronize: true,
    }),
    UserModule,
    LikesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
