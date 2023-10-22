import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IRequestUser,
  IResponse,
  IResponseUser,
} from '../infrastructure/models/user.model';
import { HTTP_USER_SERVICE } from '../infrastructure/providers/user-api.provider';

import { IUserApiService } from '../infrastructure/user-api.interface';

@Injectable()
export class UserUseCaseService {
  constructor(
    @Inject(HTTP_USER_SERVICE) private _userApiService: IUserApiService
  ) {}

  getUsers(): Observable<IResponseUser[]> {
    //TODO: aplicar logica
    return this._userApiService.getProducts();
  }

  saveUser(newUser: IRequestUser): Observable<IResponse> {
    return this._userApiService.save(newUser);
  }
}
