import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [FormsModule, MatSlideToggleModule],
  template: `<mat-slide-toggle
    (ngModelChange)="onChange($event)"
    [(ngModel)]="isDarkThemeActive"
  ></mat-slide-toggle>`,
})
export class WelcomePageComponent {
  isDarkThemeActive = false;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  onChange(newValue: boolean): void {
    if (newValue) {
      this.document.body.classList.add('dark-mode');
    } else {
      this.document.body.classList.remove('dark-mode');
    }
  }
}
