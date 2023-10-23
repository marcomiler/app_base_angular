import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContentComponent } from '@components/content/content.component';
import { SidebarComponent } from '@components/sidebar/sidebar.component';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { PreloaderComponent } from 'src/app/components/preloader/preloader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NgHttpLoaderModule,
    HttpClientModule,
    ContentComponent,
    SidebarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'app_base';
  loaderComponent = PreloaderComponent;
}
