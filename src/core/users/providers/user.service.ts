import {
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/common/entities/user.entity';
import { AppCustomException } from 'src/common/exceptions/app-custom-exception.filter';
import { CreateUserDto } from 'src/core/auth/dto/create-user.dto';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) { }

  async create(data: CreateUserDto): Promise<User> {
    const existingEmail = await this.findByEmail(data.email);
    console.log('existingEmail', existingEmail);

    if (existingEmail) {
      throw new AppCustomException(
        HttpStatus.BAD_REQUEST,
        `E-mail already exists.`,
      );
    }

    if (data.mobile) {
      const existingMobile = await this.findByMobile(data.mobile);
      if (existingMobile) {
        throw new AppCustomException(
          HttpStatus.BAD_REQUEST,
          `Mobile number already exists.`,
        );
      }
    }

    const newUser = this.userRepo.create(data);

    newUser.password = await bcrypt.hash(data.password, 10);
    console.log('data', data);
    console.log('newuser', newUser);

    return this.userRepo.save(newUser);
  }


  async findByEmail(email: string): Promise<User | null> {
    return this.userRepo.findOne({
      where: { email },
    });

  }


  async findByEmailForLogin(email: string): Promise<User | null> {
    return this.userRepo.findOne({
      where: { email },
      select: [
        'id',
        'firstName',
        'lastName',
        'username',
        'email',
        'mobile',
        'password',
      ],
    });
  }
  async findByMobile(mobile: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { mobile } });
  }


  async findOne(id: number): Promise<User | null> {
    return this.userRepo.findOne({ where: { id } });
  }

  async findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  async findUserList(): Promise<User[]> {
    return this.userRepo.find({
      select: [
        'firstName',
        'lastName',
        'username',
        'email',
        'mobile',
        'createdAt',
      ],
    });
  }

  async updateUserPassword(id: number, password: string): Promise<boolean> {
    const result = await this.userRepo.update(
      { id: id },
      { password: password },
    );
    if (result.affected && result.affected > 0) {
      return true;
    } else {
      return false;
    }
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    if (user) {
      await this.userRepo.softDelete({ id: id });
    } else {
      throw new AppCustomException(HttpStatus.BAD_REQUEST, 'User not found');
    }
  }
}
