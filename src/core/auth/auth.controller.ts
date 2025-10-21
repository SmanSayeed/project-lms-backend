import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from './decorators/public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserService } from '../users/providers/user.service';
import { ApiResponse } from 'src/common/utils/api-response';
import { LoginDto } from './dto/login.dto';

@Public()
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UserService,
  ) { }

  @Post('register')
  async signup(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ApiResponse<any>> {
    const result = await this.authService.signup(createUserDto);
    return new ApiResponse('Succesfully Registered', result);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(
    @Request() req,
    @Body() body: LoginDto,
  ): Promise<ApiResponse<any>> {
    console.log('req', req.user);
    console.log('body', body);

    const result = await this.authService.login(req.user);
    return new ApiResponse('Succesfully Logged In', result);
  }

}
