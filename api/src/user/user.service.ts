import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateUserDto, IJWTPayload } from './user.interface';
import { ERROR_MESSAGES } from '../errors.const';
import { checkPasswordHash, hashPassword, signJWT } from '../utilities';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(user: CreateUserDto): Promise<string> {
    const foundUser = await this.usersRepository.findOneBy({
      login: user.login,
    });
    if (foundUser) {
      throw new BadRequestException(ERROR_MESSAGES.RU.LOGIN_OCCUPIED);
    }

    const passHash = await hashPassword(user.password);
    const newUser = new User();
    newUser.login = user.login;
    newUser.passHash = passHash;
    try {
      const result = await this.usersRepository.insert(newUser);
      const id = result.identifiers[0].id;

      const jwtPayload: IJWTPayload = {
        id,
        login: user.login,
      };
      return await signJWT(jwtPayload);
    } catch (e) {
      if (e instanceof QueryFailedError && e.driverError.code == '23505') {
        throw new BadRequestException(ERROR_MESSAGES.RU.LOGIN_OCCUPIED);
      }
      throw e;
    }
  }

  async authUser(user: CreateUserDto): Promise<string> {
    const foundUser = await this.usersRepository.findOneBy({
      login: user.login,
    });
    if (!foundUser) {
      throw new BadRequestException(ERROR_MESSAGES.RU.WRONG_CREDENTIALS);
    }
    if (!(await checkPasswordHash(foundUser.passHash, user.password))) {
      throw new BadRequestException(ERROR_MESSAGES.RU.WRONG_CREDENTIALS);
    }
    const jwtPayload: IJWTPayload = {
      id: foundUser.id,
      login: foundUser.login,
    };
    return await signJWT(jwtPayload);
  }

  async getUserData(userId: string): Promise<IJWTPayload> {
    const foundUser = await this.usersRepository.findOneBy({
      id: userId,
    });
    if (!foundUser) {
      throw new UnauthorizedException();
    }
    return { id: foundUser.id, login: foundUser.login };
  }
}
