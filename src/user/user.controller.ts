import { Body, Controller, Get, Param, Patch, Post, Delete } from '@nestjs/common';
import { Login, User } from './entity/user.entity';
import { UserService } from './user.service';
import { get } from 'http';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('join')
  create(@Body() userData: User) {
    return this.userService.create(userData);
  }

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(':member')
  getOneUser(@Param('member') member: string): Promise<User> {
    return this.userService.getOneUser(member);
  }

  @Get(':guild')
  getGuild(@Param('guild') guild: string): Promise<User[]> {
    return this.userService.getGuildUser(guild);
  }

  @Post('login')
  login(@Body() loginData: Login): Promise<Boolean> {
    return this.userService.login(loginData);
  }

  /*  @Delete(':index')
   deleteUser(@Param('index') index: number): Promise<string> {
     
   } */
}
