export interface IRegisterUser {
  username: string;
  email: string;
  password: string;
}

export interface IAuthenticateUser {
  email: string;
  password: string;
}

export interface IUpdateUserService {
  newUsername: string;
  userId: number;
}

export abstract class UserRepository {
  abstract registerUser(newUser: IRegisterUser): Promise<void>;
  abstract findUserByEmailOrUsername(
    email: string,
    username: string,
  ): Promise<{
    id: number;
    username: string;
    email: string;
    password: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
  }>;
  abstract findUserById(userId: number): Promise<{
    id: number;
    username: string;
    email: string;
    password: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
  }>;
  abstract updateUserUsername(
    newUsername: string,
    userId: number,
  ): Promise<void>;
}
