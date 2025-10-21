import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AppCustomException } from 'src/common/exceptions/app-custom-exception.filter';
import { UserService } from 'src/core/users/providers/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginResponseDto } from '../dto/login-response.dto';
import { User } from 'src/common/entities/user.entity';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(email: string, pass: string) {
    console.log('Validating User:', email);
    console.log('Validating pass:', pass);
    if (email && pass) {
      const user = await this.usersService.findByEmailForLogin(email);
      if (!user) {
        throw new AppCustomException(
          HttpStatus.BAD_REQUEST,
          'User account not found.',
        );
      }
      console.log('user check', user);

      if (user && (await bcrypt.compare(pass, user.password))) {
        const { password, ...result } = user;
        return result;
      } else {
        throw new AppCustomException(
          HttpStatus.BAD_REQUEST,
          'Incorrect Password. Please try again.',
        );
      }
    }
    return null;
  }

  async login(user: User): Promise<LoginResponseDto> {
    const payload: any = {
      email: user.email,
      sub: user.id,
    };
    console.log('JWT Sign Payload =>', payload);
    const token = this.jwtService.sign(payload);
    console.log("User Login user", user);
    const userData = await this.usersService.findByEmail(
      user?.email);
    console.log("LoginProcessor userData", userData);
    const response = new LoginResponseDto({
      ...userData,
      token,
    });
    return response;
  }


  async signup(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

}
