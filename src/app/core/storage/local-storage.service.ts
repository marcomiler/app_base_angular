import { StorageService } from '@core/storage/storage';

export class LocalStorageService extends StorageService {
  constructor() {
    super(window.localStorage);
  }
}
