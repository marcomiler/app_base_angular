import { NgClass, NgFor } from '@angular/common';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkMenuModule } from '@angular/cdk/menu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass, NgFor, OverlayModule, CdkMenuModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() collapsed = false;
  @Input() screenWidth = 0;

  canShowSearchAsOverlay = false;
  selectedLanguage: any;

  public languages = [
    {
      language: 'English',
      flag: 'us',
    },
    {
      language: 'Spanish',
      flag: 'spain',
    },
  ];

  public userItems = [
    {
      icon: 'far fa-user',
      label: 'Profile',
    },
    {
      icon: 'far fa-cog',
      label: 'Settings',
    },
    {
      icon: 'far fa-power-off',
      label: 'Logout',
    },
  ];

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkCanShowAsOverlay(window.innerWidth);
  }

  ngOnInit(): void {
    this.checkCanShowAsOverlay(window.innerWidth);
    this.selectedLanguage = this.languages[0];
  }

  getHeadClass(): string {
    let styleClass = '';
    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'head-trimmed';
    } else {
      styleClass = 'head-md-screen';
    }

    return styleClass;
  }

  checkCanShowAsOverlay(innerWidth: number): void {
    if (innerWidth < 845) {
      this.canShowSearchAsOverlay = true;
    } else {
      this.canShowSearchAsOverlay = false;
    }
  }
}
