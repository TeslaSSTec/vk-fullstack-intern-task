import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto, IJWTPayload } from './user.interface';
import { UserService } from './user.service';
import { Response } from 'express';
import { AuthGuard } from '../guards/auth.guard';
import { GuardedRequest } from '../guards/auth.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getUserData(@Req() req: GuardedRequest): Promise<IJWTPayload> {
    return await this.userService.getUserData(req.user.id);
  }

  @Post()
  async create(@Body() createUser: CreateUserDto, @Res() res: Response) {
    res.setHeader(
      'X-Auth-Token',
      await this.userService.createUser(createUser),
    );
    return res.json(createUser);
  }

  @Post('auth')
  async auth(@Body() authUser: CreateUserDto, @Res() res: Response) {
    res.setHeader('X-Auth-Token', await this.userService.authUser(authUser));
    return res.send();
  }
}
