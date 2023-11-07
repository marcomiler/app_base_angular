import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { REGEXP_FORMATS } from 'src/app/utils/constants';

@Directive({
  selector: '[identityDocument]',
})
export class IdentityDocumentDirective {
  @Input() identityDocument: string = '';
  @Output() inputChanged: EventEmitter<void | string> = new EventEmitter<
    void | string
  >();

  constructor(private _el: ElementRef) {}

  @HostListener('input', ['$event']) onInput(event: Event) {
    const inputElement = this._el.nativeElement as HTMLInputElement;
    const inputValue = inputElement.value;

    let maxLength = 0;
    let regexp: RegExp = /(?:)/;

    switch (this.identityDocument) {
      case 'DNI':
        regexp = REGEXP_FORMATS.onlyNumbers;
        maxLength = 8;
        break;
      case 'RUC':
        regexp = REGEXP_FORMATS.onlyNumbers;
        maxLength = 12;
        break;
      case 'CE':
        regexp = REGEXP_FORMATS.alphaNumeric;
        maxLength = 12;
        break;
      default:
        break;
    }

    this._el.nativeElement.value = inputValue.replace(regexp, '');

    if (inputValue === this._el.nativeElement.value) {
      this.inputChanged.emit(inputValue);
    }

    if (inputValue.length > maxLength) {
      inputElement.value = inputValue.slice(0, maxLength);
      this.inputChanged.emit();
    }
  }

  @HostListener('paste', ['$event']) onPaste(event: ClipboardEvent) {
    const clipboardData = event.clipboardData?.getData('text/plain') ?? '';
    let processedValue = '';
    let regexp: RegExp = /(?:)/;
    let maxLength = 0;

    switch (this.identityDocument) {
      case 'DNI':
        regexp = REGEXP_FORMATS.onlyNumbers;
        maxLength = 7;
        break;
      case 'RUC':
        regexp = REGEXP_FORMATS.onlyNumbers;
        maxLength = 11;
        break;
      case 'CE':
        regexp = REGEXP_FORMATS.alphaNumeric;
        maxLength = 11;
        break;
      default:
        break;
    }

    if (regexp.test(clipboardData)) {
      event.preventDefault();
      this.inputChanged.emit();
    }

    if (processedValue.length > maxLength) {
      processedValue = clipboardData.replace(regexp, '').slice(0, maxLength);
      this.inputChanged.emit(processedValue);
    }
  }
}
