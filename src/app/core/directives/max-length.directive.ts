import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Directive({
  selector: '[maxCharacters]',
})
export class MaxCharactersDirective {
  @Input() maxCharacters: number = 100; //Se puede cambiar este valor por defecto
  @Output() maxLengthReached: EventEmitter<void> = new EventEmitter<void>();

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInput(event: Event) {
    const inputElement = this.el.nativeElement as HTMLInputElement;
    const inputValue = inputElement.value;

    if (inputValue.length > this.maxCharacters) {
      inputElement.value = inputValue.slice(0, this.maxCharacters);
      this.maxLengthReached.emit();
    }
  }

  @HostListener('paste', ['$event']) onPaste(event: ClipboardEvent) {
    const clipboardData = event.clipboardData?.getData('text/plain') ?? '';
    if (clipboardData.length > this.maxCharacters) {
      event.preventDefault();
    }
  }
}
