import { Injectable } from '@angular/core';
import { DatetimepickerComponent } from '@components/datetimepicker/datetimepicker.component';

@Injectable()
export class DropdownService {
  private select!: DatetimepickerComponent;

  public register(select: DatetimepickerComponent) {
    this.select = select;
  }

  public getSelect(): DatetimepickerComponent {
    return this.select;
  }
}
