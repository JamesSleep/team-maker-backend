import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LoginUserRequestDto } from 'src/auth/dto/login.user.request.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorators';
import { CreateUserDto } from './dto/users.create.dto';
import { UpdateUserDto } from './dto/users.update.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('current')
  async getCurrentUser(@CurrentUser() user: User) {
    return await this.authService.getCurrentUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getOneUsers(@Param('id') id: number) {
    return await this.userService.getOneUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Post('login')
  async login(@Body() data: LoginUserRequestDto) {
    return this.authService.jwtUserLogin(data);
  }

  @Post()
  async signUp(@Body() body: CreateUserDto) {
    return await this.userService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  async update(@Param('id') id: number, @Body() body: UpdateUserDto) {
    return await this.userService.modify(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async delete(@Param('id') id: number) {
    return await this.userService.remove(id);
  }
}
