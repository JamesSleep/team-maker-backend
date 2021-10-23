import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Login, User } from './entity/user.entity';
import * as Bcrypt from 'bcryptjs';
import { check } from 'prettier';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
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

  async create(userData: User): Promise<boolean> {
    
    const addUser = await this.userRepository.create();

    const salt: string = await Bcrypt.genSalt(10);
    const password: string = await Bcrypt.hash(userData.password, salt);

    addUser.email = userData.email;
    addUser.password = password;
    addUser.salt = salt;
    addUser.guild = userData.guild;

    await this.userRepository.save(addUser);

    return true;
  }

  async login(loginUser: Login): Promise<Boolean> {
    const user: User = await this.userRepository.findOne({
      where: {
        email: loginUser.email
      }
    });

    const comparePW = await Bcrypt.hash(loginUser.password, user.salt);

    const check = comparePW === user.password;

    return check;
  }

  async remove(index: number): Promise<void> {
    await this.userRepository.delete({ index: index });
  }
}
