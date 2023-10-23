import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ISideNavToggle } from '@components/sidebar/helper/helper';
import { SidebarComponent } from '@components/sidebar/sidebar.component';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [RouterModule, NgClass, SidebarComponent],
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent {
  isSidenavCollapsed: boolean = false;
  screenWidth: number = 0;

  onToggleSidenav(data: ISideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSidenavCollapsed = data.collapsed;
  }

  getBodyClass(): string {
    let styleClass = '';
    if (this.isSidenavCollapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed';
    } else if (
      this.isSidenavCollapsed &&
      this.screenWidth <= 768 &&
      this.screenWidth > 0
    ) {
      styleClass = 'body-md-screen';
    }

    return styleClass;
  }
}
