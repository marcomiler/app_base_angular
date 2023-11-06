import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [FormsModule, MatSlideToggleModule],
  template: `<div style="margin-top: 150px">
    <mat-slide-toggle
      (ngModelChange)="onChange($event)"
      [(ngModel)]="isDarkThemeActive"
    ></mat-slide-toggle>
  </div>`,
})
export class WelcomePageComponent {
  isDarkThemeActive = false;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  onChange(newValue: boolean): void {
    const app = this.document.querySelector('.app');
    if (newValue) {
      app?.setAttribute('data-theme', 'dark');
    } else {
      app?.setAttribute('data-theme', 'light');
    }
  }
}
