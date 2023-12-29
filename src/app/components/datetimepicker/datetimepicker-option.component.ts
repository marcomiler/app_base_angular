import { Highlightable } from '@angular/cdk/a11y';
import { Component, HostBinding, HostListener, Input } from '@angular/core';
import { DatetimepickerComponent } from '@components/datetimepicker/datetimepicker.component';
import { DropdownService } from '@components/datetimepicker/dropdown-service.service';

@Component({
  standalone: true,
  selector: 'app-datetimepicker-option',
  template: '{{value}}',
  providers: [DropdownService],
  styles: [
    `
      :host {
        display: block;
        padding: 0 0.875rem;
        height: 2.5rem;
        line-height: 2.5rem;
        color: #333;
        background-color: #fff;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        user-select: none;
        cursor: pointer;

        &.selected {
          color: #0079cc;
          background-color: #eee;
          font-weight: bold;

          &:hover,
          &.active {
            background-color: #eee;

            @media screen and (-ms-high-contrast: active) {
              background-color: #eee;
            }
          }
        }

        &:hover,
        &.active {
          outline: none;
          background-color: #eee;

          @media screen and (-ms-high-contrast: active) {
            background-color: #eee;
          }
        }

        &.disabled {
          color: #93a1aa;
          cursor: auto;

          &:hover,
          &:focus {
            outline: none;
            background-color: #fff;

            @media screen and (-ms-high-contrast: active) {
              background-color: #fff;
            }
          }
        }
      }
    `,
  ],
})
export class DatetimepickerOptionComponent implements Highlightable {
  // @Input() public key!: string;

  @Input() public value!: string;

  @HostBinding('class.selected')
  public get selected(): boolean {
    return this.select?.selectedOption === this;
  }

  @HostBinding('class.active')
  public active = false;

  private select: DatetimepickerComponent;

  constructor(private dropdownService: DropdownService) {
    this.select = this.dropdownService.getSelect();
  }

  public getLabel(): string {
    return this.value;
  }

  public setActiveStyles(): void {
    this.active = true;
  }

  public setInactiveStyles(): void {
    this.active = false;
  }

  @HostListener('click', ['$event'])
  public onClick(event: UIEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.select.selectOption(this);
  }
}
