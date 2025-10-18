import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterUserDto } from 'src/auth/dto/register.user.dto';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  // ✅ Check if user exists by email
  async findUser(email: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { email } });
  }

  async createUser(registerUserDto: RegisterUserDto) {
    try {
      const user = this.userRepo.create(registerUserDto);
      return await this.userRepo.save(user);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY' || error.errno === 1062) {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  async getUserSession(id: number) {
    const user = await this.userRepo.findOne({
      where: { id },
      select: { id: true, email: true, name: true, role: true },
    });

    // console.log('user \n', user);

    return user;
  }
}
