import { Body, Controller, Get, Param, Patch, Post, Delete } from '@nestjs/common';
import { Login, User } from './entity/user.entity';
import { UserService } from './user.service';
import { ResponseData } from 'src/common/response.entity';
import { ErrorCode } from 'src/common/errorCode';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('all')
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get('findUser/:member')
  async getOneUser(@Param('member') member: string): Promise<ResponseData> {
    const user = await this.userService.getOneUser(member);
    if (user) {
      return { success: true, data: user };
    } else {
      return { success: false, data: ErrorCode[101] };
    }
  }

  @Get('findGuild/:guild')
  getGuild(@Param('guild') guild: string): Promise<User[]> {
    return this.userService.getGuildUser(guild);
  }

  @Get('findPass/:email')
  async sendEmail(@Param('email') email: string): Promise<ResponseData>{
    const number = await this.userService.sendMail(email);
    if (number === 0) return { success: false, data: ErrorCode[102] }
    else return { success: true, data: number }
  }

  @Post('join')
  async create(@Body() userData: User): Promise<ResponseData> {
    const result = await this.userService.create(userData);

    if (result) return { success: true, data: "" }
    else return { success: false, data: ErrorCode[102] }
  }

  @Post('login')
  async login(@Body() loginData: Login): Promise<ResponseData> {
    const result = await this.userService.login(loginData);
    // 0 로그인성공, 1 로그인정보없음, 2 토큰만료
    switch (result) {
      case 0: return { success: true, data: "로그인성공" };
      case 1: return { success: false, data: ErrorCode[103] };
      case 2: return { success: false, data: ErrorCode[104] };
    }
  }

  @Post('modify')
  async update(@Body() updateUser: User): Promise<ResponseData> {
    const result = await this.userService.modify(updateUser);
    if (result) return { success: true, data: "" };
    else return { success: false, data: ErrorCode[101] };
  }

  /*  @Delete(':index')
   deleteUser(@Param('index') index: number): Promise<string> {
     
   } */
}
