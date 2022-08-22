import { Injectable } from '@nestjs/common';
import * as Bcrypt from 'bcryptjs';
import { UserRepository } from './users.repository';
import { CreateUserDto } from './dto/users.create.dto';
import { UpdateUserDto } from './dto/users.update.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAllUsers() {
    return await this.userRepository.find();
  }

  async getOneUser(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async create(body: CreateUserDto) {
    const { password } = body;
    const pw = await Bcrypt.hash(password, 'salt');

    return await this.userRepository.save({ ...body, password: pw });
  }

  async modify(id: number, body: UpdateUserDto) {
    return await this.userRepository.save({ id, ...body });
  }

  async remove(id: number) {
    return await this.userRepository.softDelete(id);
  }
}
