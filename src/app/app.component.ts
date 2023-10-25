import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContentComponent } from '@components/content/content.component';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { PreloaderComponent } from 'src/app/components/preloader/preloader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgHttpLoaderModule, ContentComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'app_base';
  loaderComponent = PreloaderComponent;
}
