import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { GuardedRequest } from '../guards/auth.interface';
import { LikesService } from './likes.service';
import { createLikeDto, getLikesDto } from './likes.interface';
import { Like } from './like.entity';

@Controller('likes')
@UseGuards(AuthGuard)
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Get()
  async getLikes(@Req() req: GuardedRequest): Promise<getLikesDto> {
    return { data: await this.likesService.getLikes(req.user.id) };
  }

  @Post()
  async createLike(
    @Req() req: GuardedRequest,
    @Body() like: createLikeDto,
  ): Promise<Like> {
    return this.likesService.createLike(like.cat_id, req.user.id, like.url);
  }

  @Delete(':cat_id')
  async removeLike(
    @Param() { cat_id }: { cat_id: string },
    @Req() req: GuardedRequest,
  ) {
    return this.likesService.removeLike(cat_id, req.user.id);
  }
}
