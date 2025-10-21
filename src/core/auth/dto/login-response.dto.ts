export class LoginResponseDto implements LoginUser {
  id: number;
  firstName: string | null;
  lastName: string | null;
  email: string;
  username: string;
  // role: UserRoleEnum;
  mobile: string | null;
  token: string;

  constructor(partial: Partial<LoginResponseDto>) {
    Object.assign(this, partial);
  }
}

export interface LoginUser {
  id: number;
  firstName: string | null;
  lastName: string | null;
  email: string;
  username: string;
  // role: UserRoleEnum;
  mobile: string | null;
  token: string;
}

