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

import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
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
import { DatetimepickerOptionComponent } from '@components/datetimepicker/datetimepicker-option.component';
import { DropdownService } from '@components/datetimepicker/dropdown-service.service';
import { DropdownComponent } from '@components/datetimepicker/dropdown.component';
const PICK_FORMATS = {
  parse: { dateInput: { month: 'short', year: 'numeric', day: 'numeric' } },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
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
    DropdownComponent,
  ],
  templateUrl: './datetimepicker.component.html',
  styleUrls: ['./datetimepicker.component.scss'],
  providers: [
    DropdownService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatetimepickerComponent),
      multi: true,
    },
    { provide: DateAdapter, useClass: PickDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS },
  ],
})
export class DatetimepickerComponent
  implements AfterViewInit, ControlValueAccessor
{
  @Input() placeholder!: string;
  @Input() min!: Date;
  @Input() max!: Date;
  @Input() public selected!: string;
  @Input() public required = false;
  @Input() public disabled = false;

  @ViewChild('inputDate') public inputDate!: ElementRef;

  @Output() changed = new EventEmitter<any>();
  @Output() closed = new EventEmitter<void>();

  @ContentChildren(DatetimepickerOptionComponent)
  public options: QueryList<DatetimepickerOptionComponent> | undefined;

  public selectedOption: DatetimepickerOptionComponent | undefined;

  private keyManager:
    | ActiveDescendantKeyManager<DatetimepickerOptionComponent>
    | undefined;

  @ViewChild('dropdownComponent')
  public dropdown!: DropdownComponent;

  constructor(private dropdownService: DropdownService) {
    this.dropdownService.register(this);
  }

  get inputValue(): Date | null {
    return this.value ? new Date(this.value) : null;
  }

  public selectOption(option: DatetimepickerOptionComponent) {
    this.keyManager?.setActiveItem(option);
    this.selected = option.value;
    this.selectedOption = option;
    this.hideDropdown();
    this.inputDate.nativeElement.focus();
    this.onChange();
  }

  public ngAfterViewInit() {
    setTimeout(() => {
      this.selectedOption = this.options
        ?.toArray()
        .find((option) => option.value === this.selected);

      this.keyManager = new ActiveDescendantKeyManager(this.options!)
        .withHorizontalOrientation('ltr')
        .withVerticalOrientation()
        .withWrap();
    });
  }

  value!: any;
  isDisabled!: boolean;

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

  // onChanged(event: MatDatepickerInputEvent<Date>): void {
  onChanged(event: any): void {
    const value = event.value.format('DD/MM/YYYY HH:mm:ss');
    this.value = value;
    this.propagateChange(value);
    this.changed.emit(value);
  }

  showDropdown(): void {
    console.log('dropdown: ', this.dropdown);
    this.dropdown?.show();

    if (!this.options?.length) return;

    this.selected
      ? this.keyManager?.setActiveItem(this.selectedOption!)
      : this.keyManager?.setFirstItemActive();
  }

  public hideDropdown() {
    this.dropdown.hide();
  }

  onClosed(): void {
    this.propagateTouched();
    this.closed.emit();
  }

  public onChange() {
    this.onChanged(this.selected);
  }
}
