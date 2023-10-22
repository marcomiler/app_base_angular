import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import {
  IRequestUser,
  IResponse,
  IResponseUser,
} from '../infrastructure/models/user.model';
import { IUserApiService } from './user-api.interface';

@Injectable()
export class UserApiService implements IUserApiService {
  private _httpClient = inject(HttpClient);
  private readonly URL_USER = environment.api + '/user';

  getProducts(): Observable<IResponseUser[]> {
    return this._httpClient.get<IResponseUser[]>(this.URL_USER);
  }

  save(newProduct: IRequestUser): Observable<IResponse> {
    return this._httpClient.post<IResponse>(this.URL_USER, newProduct);
  }
}
