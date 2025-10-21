import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register.user.dto';
import bcrypt from 'bcryptjs';
import { LoginUserDto } from './dto/login.user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/core/users/providers/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) { }

  async register(registerUserDto: RegisterUserDto) {
    const userExists = await this.userService.findByEmail(registerUserDto.email);
    if (userExists) {
      throw new ConflictException('Email is already taken');
    }

    // 2️⃣ Hash password
    const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);

    // 3️⃣ Create user using UserService
    try {
      await this.userService.create({
        ...registerUserDto,
        password: hashedPassword
      });

      return {
        message: 'User registered successfully',
        statusCode: 201,
      };
    } catch (error) {
      throw new InternalServerErrorException('Registration failed');
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const userExists = await this.userService.findByEmail(loginUserDto.email);
    if (!userExists) {
      throw new ConflictException(
        'Email is not registerd. Please register your email',
      );
    }

    const isMatched = await bcrypt.compare(
      loginUserDto.password,
      userExists.password,
    );

    if (!isMatched) {
      throw new UnauthorizedException('Email is registerd yet');
    }

    try {
      const payload = { sub: userExists.id };
      const token = await this.jwtService.signAsync(payload);
      // console.log('token \n', token);

      return {
        message: 'User logged successfully',
        statusCode: 200,
        access_token: token,
      };
    } catch (error) {
      throw new InternalServerErrorException('Login failed');
    }
  }
}
