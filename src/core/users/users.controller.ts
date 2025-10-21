import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './providers/user.service';
import { ApiResponse } from 'src/common/utils/api-response';

@Controller('api/user')
export class UserController {
  constructor(
    private readonly usersService: UserService,
  ) { }
  // @Get('me')
  // async getProfile(@Request() req): Promise<ApiResponse<any>> {
  //   const result = await this.usersService.getOwnUserInfo(req.user.id);
  //   if (result) {
  //     return new ApiResponse('User Found', result);
  //   }
  //   return new ApiResponse('User not found', result);
  // }

  @Get()
  async getAllUsers(): Promise<ApiResponse<any>> {
    const result = await this.usersService.findUserList();
    if (result && result.length > 0) {
      return new ApiResponse('Users listed successfully.', result);
    }
    return new ApiResponse('User lit not found.', null);
  }


  // @Put('update')
  // async updateUser(
  //   @Query('userId', ParseIntPipe) userId: number,
  //   @Body() updateUserDto: UpdateUserDto,
  // ): Promise<ApiResponse<any>> {
  //   const result = await this.usersService.updateUser(userId, updateUserDto);
  //   return new ApiResponse('User profile updated successfully.', result);
  // }

  @Delete('delete/:userId')
  async remove(
    @Query('userId', ParseIntPipe) userId: number,
  ): Promise<ApiResponse<any>> {
    await this.usersService.remove(userId);
    return new ApiResponse('User deleted Successful.', null);
  }
}
