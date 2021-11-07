import { Body, Controller, Get, Param, Patch, Post, Delete } from '@nestjs/common';
import { Login, User } from './entity/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('join')
  create(@Body() userData: User) {
    return this.userService.create(userData);
  }

  @Get('all')
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get('findUser/:member')
  getOneUser(@Param('member') member: string): Promise<User> {
    return this.userService.getOneUser(member);
  }

  @Get('findGuild/:guild')
  getGuild(@Param('guild') guild: string): Promise<User[]> {
    return this.userService.getGuildUser(guild);
  }

  @Post('login')
  async login(@Body() loginData: Login): Promise<Boolean> {
    
    return this.userService.login(loginData);
  }

  @Post('modify')
  update(@Body() updateUser: User): Promise<Boolean> {
    return this.userService.modify(updateUser);
  }

  @Get('findPass/:email')
  async sendEmail(@Param('email') email: string): Promise<Boolean>{
    return this.userService.sendMail(email);
  }

  /*  @Delete(':index')
   deleteUser(@Param('index') index: number): Promise<string> {
     
   } */
}
