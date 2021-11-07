import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Login, User } from './entity/user.entity';
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

  async getGuildUser(guild: string): Promise<User[]> {
    return await this.userRepository.find({ guild: guild })
  }

  async create(userData: User): Promise<Boolean> {
    const addUser = await this.userRepository.create();

    const salt: string = await Bcrypt.genSalt(10);
    const password: string = await Bcrypt.hash(userData.password, salt);

    addUser.email = userData.email;
    addUser.password = password;
    addUser.salt = salt;

    await this.userRepository.save(addUser);

    return true;
  }

  async login(loginUser: Login): Promise<Boolean> {
    const newUser: User = await this.getOneUser(loginUser.email);

    if (!newUser) return false;

    const comparePW = await Bcrypt.hash(loginUser.password, newUser.salt);

    const check = comparePW === newUser.password;

    return check;
  }

  async modify(updateUser: User): Promise<Boolean> {
    const user: User = await this.userRepository.findOne({
      where: {
        email: updateUser.email
      }
    });

    const salt: string = await Bcrypt.genSalt(10);
    const password: string = await Bcrypt.hash(updateUser.password, salt);

    user.email = updateUser.email;
    user.password = password;
    user.salt = salt;
    user.guild = updateUser.guild;

    await this.userRepository.save(user);

    return true;
  }

  async remove(index: number): Promise<void> {
    await this.userRepository.delete({ index: index });
  }

  async sendMail(email: string): Promise<Boolean> {
    try {
      const number:number = this.rand(111111, 999999);
      await this.mailerService.sendMail({
        to: email,
        from: 'tyuyiy@naver.com',
        subject: '팀메이커 비밀번호 찾기 인증번호입니다',
        html: `안녕하세요. 팀메이커입니다 <br> 인증번호는 ${number} 입니다.`
      });
      return true;
    } catch (e) {
      console.log(e);
    }
  }

  rand(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1));
  }
}
