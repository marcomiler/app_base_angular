import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-preloader',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./preloader.component.scss'],
  template: `
    <div id="cws_page_loader_container" class="cws_loader_container">
      <div id="cws_page_loader" class="cws_loader">
        <div class="inner"></div>
      </div>
    </div>
  `,
})
export class PreloaderComponent {}
