import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Login, User, Question } from './entity/user.entity';
import * as Bcrypt from 'bcryptjs';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly mailerService: MailerService
  ) { }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getOneUser(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        email: email
      }
    });
  }

  async getOneUserForIndex(index: number): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        index: index
      }
    })
  }

  async getGuildUser(guild: string): Promise<User[]> {
    return await this.userRepository.find({ guild: guild })
  }

  async create(userData: User): Promise<Boolean> {
    const addUser = await this.userRepository.create();
    const salt: string = await Bcrypt.genSalt(10);
    const password: string = await Bcrypt.hash(userData.password, salt);
    const timestamp = new Date().getTime();
    const token: string = await Bcrypt.genSalt(10);

    addUser.email = userData.email;
    addUser.password = password;
    addUser.salt = salt;
    addUser.nickname = userData.nickname;
    addUser.auth_token = token;
    addUser.timestamp = timestamp.toString();

    await this.userRepository.save(addUser);
    return true;
  }

  async login(loginUser: Login): Promise<number> {
    const user: User = await this.getOneUser(loginUser.email);
    const timestamp = new Date().getTime();
    const check = this.comparePassword(loginUser);

    if (!user || !check) return 1;

    if (!user.auth_token) {
      const authToken = await Bcrypt.genSalt(10);
      user.auth_token = authToken;
      user.timestamp = timestamp.toString();
      user.password = loginUser.password;
      await this.modify(user);
      return 0;
    } else {
      const gap = timestamp - Number(user.timestamp);
      // 60 * 60 * 24 * 1000 * 3 ?????? 3?????? ??????
      if (gap < (60 * 60 * 24 * 1000 * 3)) {
        user.timestamp = timestamp.toString();
        await this.modify(user);
        return 0;
      } else {
        user.auth_token = null;
        user.timestamp = null;
        user.password = loginUser.password;
        await this.modify(user);
        return 2;
      }
    }
  }

  async comparePassword(userData: Login): Promise<Boolean> {
    const user: User = await this.getOneUser(userData.email);
    const comparePW = await Bcrypt.hash(userData.password, user.salt);
    return comparePW === user.password;
  }

  async modify(updateUser: User): Promise<Boolean> {
    const user: User = await this.getOneUser(updateUser.email);
    if (!user) return false;
    const salt: string = await Bcrypt.genSalt(10);
    const password: string = await Bcrypt.hash(updateUser.password, salt);

    user.password = password;
    user.salt = salt;
    user.guild = updateUser.guild;
    user.auth_token = updateUser.auth_token;
    user.timestamp = updateUser.timestamp;

    await this.userRepository.save(user);

    return true;
  }

  async remove(email: string): Promise<void> {
    await this.userRepository.delete({ email: email });
  }

  async sendMail(email: string): Promise<number> {
    try {
      const number:number = this.rand(111111, 999999);
      await this.mailerService.sendMail({
        to: email,
        from: 'tyuyiy@naver.com',
        subject: '???????????? ???????????? ?????? ?????????????????????',
        html: `???????????????. ????????????????????? <br> ??????????????? ${number} ?????????.`
      });
      return number;
    } catch (e) {
      console.log(e);
      return 0;
    }
  }

  async questionMail(question:Question): Promise<boolean> {
    try {
      await this.mailerService.sendMail({
        to: 'tyuyiy@naver.com',
        from: 'tyuyiy@naver.com',
        subject: `${question.title} / ${question.email}`,
        html: question.content
      });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  rand(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1));
  }
}
