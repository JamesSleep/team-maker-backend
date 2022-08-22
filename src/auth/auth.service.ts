import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from 'src/users/users.repository';
import { LoginUserRequestDto } from './dto/login.user.request.dto';
import { JwtService } from '@nestjs/jwt';
import * as Bcrypt from 'bcryptjs';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async jwtUserLogin(data: LoginUserRequestDto) {
    const { email, password } = data;

    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('로그인정보를 확인해주세요.');
    }

    const isPasswordValidated = await Bcrypt.compare(password, user.password);

    if (!isPasswordValidated) {
      throw new UnauthorizedException('로그인정보를 확인해주세요.');
    }

    const payload = { email, sub: user.id };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async getCurrentUser(getUser: User) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: getUser.id },
      });
      return user;
    } catch (e) {
      throw new UnauthorizedException('토큰값이 올바르지 않습니다.');
    }
  }
}
