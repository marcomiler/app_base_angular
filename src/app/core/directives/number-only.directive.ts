import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';
import { REGEXP_FORMATS } from 'src/app/utils/constants';
@Directive({
  selector: '[NumbersOnly]',
})
export class NumberOnlyDirective {
  @Output() inputChanged: EventEmitter<void> = new EventEmitter<void>();

  constructor(private _el: ElementRef) {}

  @HostListener('input', ['$event']) onChange(event: Event) {
    const initalValue = this._el.nativeElement.value;
    this._el.nativeElement.value = initalValue.replace(
      REGEXP_FORMATS.onlyNumbers,
      ''
    );
    if (initalValue === this._el.nativeElement.value) {
      this.inputChanged.emit(initalValue);
    }
  }

  @HostListener('paste', ['$event']) onPaste(event: ClipboardEvent) {
    const clipboardData = event.clipboardData?.getData('text/plain') ?? '';
    if (REGEXP_FORMATS.onlyNumbers.test(clipboardData)) {
      event.preventDefault();
    }
  }
}
