import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from './like.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { ERROR_MESSAGES } from '../errors.const';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private likesRepository: Repository<Like>,
  ) {}

  async getLikes(userId: string): Promise<Like[]> {
    return await this.likesRepository.findBy({
      userId,
    });
  }

  async createLike(catId: string, userId: string, url: string) {
    const newLike = new Like();
    newLike.userId = userId;
    newLike.catId = catId;
    newLike.url = url;
    try {
      await this.likesRepository.insert(newLike);
      return newLike;
    } catch (e) {
      if (e instanceof QueryFailedError && e.driverError.code == '23505') {
        throw new BadRequestException(ERROR_MESSAGES.RU.ALREADY_LIKED);
      }
      throw e;
    }
  }

  async removeLike(catId: string, userId: string) {
    if ((await this.likesRepository.delete({ userId, catId })).affected == 0) {
      throw new NotFoundException(ERROR_MESSAGES.RU.NOT_LIKED);
    }
  }
}
