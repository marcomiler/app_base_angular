import { environment } from '@environments/environment';
import { decrypt, encrypt } from 'src/app/utils/util-encrypt';

export abstract class StorageService implements Storage {
  constructor(protected readonly _storage: Storage) {}

  get length(): number {
    return this._storage.length;
  }

  setItem(key: string, value: unknown): void {
    let data = JSON.stringify(value);
    if (environment.encrypt) data = encrypt(data);
    this._storage.setItem(key, data);
  }

  getItem<T>(key: string): T | null {
    let data = this._storage.getItem(key);

    if (data !== null) {
      return environment.encrypt
        ? (decrypt<T>(data) as T)
        : (JSON.parse(data) as T);
    }

    return null;
  }

  clear(): void {
    this._storage.clear();
  }

  key(index: number): string | null {
    return this._storage.key(index);
  }
  removeItem(key: string): void {
    this._storage.removeItem(key);
  }
}
