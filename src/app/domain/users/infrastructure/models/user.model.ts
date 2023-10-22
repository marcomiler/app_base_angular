export interface IRequestUser {
  readonly name: string;
  readonly lastname: string;
}

export interface IResponseUser extends IRequestUser {
  readonly userId: number;
}

export interface IResponse {
  readonly message: string;
  readonly code: number;
}
