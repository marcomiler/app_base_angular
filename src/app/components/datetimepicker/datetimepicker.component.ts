import {
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Injectable,
  Input,
  Output,
  QueryList,
  ViewChild,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import * as moment from 'moment';

import { NgFor } from '@angular/common';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  // DateAdapter,
  // MAT_DATE_FORMATS,
  // MAT_DATE_LOCALE,
  MatNativeDateModule,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  MatDatetimepickerModule,
  MatNativeDatetimeModule,
} from '@mat-datetimepicker/core';
import { MatMomentDatetimeModule } from '@mat-datetimepicker/moment';
const PICK_FORMATS = {
  parse: {
    dateInput: 'L',
    monthInput: 'MMMM',
    timeInput: 'LT',
    datetimeInput: 'L LT',
  },
  display: {
    dateInput: 'L',
    monthInput: 'MMMM',
    datetimeInput: 'L LT',
    timeInput: 'LT',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
    popupHeaderDateLabel: 'ddd, DD MMM',
  },
};

@Injectable()
class PickDateAdapter extends MomentDateAdapter {
  override format(date: moment.Moment, displayFormat: Object): string {
    if (displayFormat === 'input') {
      return date.format('DD/MM/YYYY HH:mm:ss');
    } else {
      return date.toDate().toDateString();
    }
  }
}

@Component({
  selector: 'app-datetimepicker',
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    FormsModule,
    MatSelectModule,
    NgFor,

    MatNativeDatetimeModule,
    MatMomentDatetimeModule,
    MatDatetimepickerModule,
  ],
  templateUrl: './datetimepicker.component.html',
  styleUrls: ['./datetimepicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatetimepickerComponent),
      multi: true,
    },
    { provide: DateAdapter, useClass: PickDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS },
  ],
})
export class DatetimepickerComponent implements ControlValueAccessor {
  @Input() placeholder!: string;
  @Input() min!: Date;
  @Input() max!: Date;
  @Input() public selected!: string;
  @Input() public required = false;
  @Input() public disabled = false;

  value!: any;
  isDisabled!: boolean;

  @ViewChild('inputDate') public inputDate!: ElementRef;

  @Output() changed = new EventEmitter<any>();
  @Output() closed = new EventEmitter<void>();

  public timeInterval = 5;

  get inputValue(): Date | null {
    return this.value ? new Date(this.value) : null;
  }

  private propagateChange: any = () => {};

  private propagateTouched: any = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onChanged(event: any): void {
    const value = event.value;
    this.value = value;
    this.propagateChange(value);
    this.changed.emit(value);
  }
}
