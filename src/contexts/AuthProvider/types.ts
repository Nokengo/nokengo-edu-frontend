export interface IUser {
  email?: string;
  token?: string;
  role?: string;
  id?: string;
}

export interface DecodedToken {
  email: string;
  exp: number;
  iat: number;
  sub: string;
  role: number;
}

export interface IContext extends IUser {
  authenticate: ({email, password}: LoginReqDto) => Promise<void>;
  logout: () => void;
}

export interface IAuthProvider {
  children: JSX.Element;
}

export interface LoginReqDto {
  email: string;
  password: string;
}

export interface TokenDto {
  role: string;
}