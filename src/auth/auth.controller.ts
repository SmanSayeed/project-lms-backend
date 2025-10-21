import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register.user.dto';
import { LoginUserDto } from './dto/login.user.dto';
import { UserService } from 'src/core/users/providers/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  // @UseGuards(AuthGuard)
  // @Get('session')
  // async getProfile(@Request() req) {
  //   return await this.userService.getUserSession(req.user.sub);
  // }
}
