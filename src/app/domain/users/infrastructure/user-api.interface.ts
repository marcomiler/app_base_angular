import { Observable } from 'rxjs';
import {
  IRequestUser,
  IResponse,
  IResponseUser,
} from '../infrastructure/models/user.model';

export interface IUserApiService {
  getProducts(): Observable<IResponseUser[]>;
  save(newProduct: IRequestUser): Observable<IResponse>;
}
