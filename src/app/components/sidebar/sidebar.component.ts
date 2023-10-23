import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { NgClass, NgFor, NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  INavbarData,
  ISideNavToggle,
  fadeInOut,
} from '@components/sidebar/helper/helper';
import { SublevelComponent } from '@components/sidebar/sublevel-menu.component';

const navbarData: INavbarData[] = [
  {
    routerLink: 'users',
    icon: 'fal fa-box-open',
    label: 'Usuarios',
    items: [
      {
        routerLink: 'users',
        label: 'Listado Usuarios',
      },
      {
        routerLink: 'users/edit',
        label: 'Crear Usuarios',
      },
    ],
  },
  {
    routerLink: 'events',
    icon: 'fal fa-chart-bar',
    label: 'Eventos',
    items: [
      {
        routerLink: 'events',
        label: 'Listado Eventos',
      },
      {
        routerLink: 'events/edit',
        label: 'Crear Eventos',
      },
    ],
  },
  {
    routerLink: '/',
    icon: 'fal fa-chart-bar',
    label: 'Prueba',
  },
];

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, RouterModule, SublevelComponent],
  templateUrl: './sidebar.component.html',
  animations: [
    fadeInOut,
    trigger('rotate', [
      transition(':enter', [
        animate(
          '1000ms',
          keyframes([
            style({ transform: 'rotate(0deg)', offset: '0' }),
            style({ transform: 'rotate(2turn)', offset: '1' }),
          ])
        ),
      ]),
    ]),
  ],
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Output() onToggleSidenav: EventEmitter<ISideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navData = navbarData;
  multiple: boolean = false;

  constructor(private _router: Router) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this._emitToggleSidenav();
    }
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
    this._emitToggleSidenav();
  }

  CloseSidenav(): void {
    this.collapsed = false;
    this._emitToggleSidenav();
  }

  private _emitToggleSidenav(): void {
    this.onToggleSidenav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }

  handleClick(item: INavbarData): void {
    this.shrinkItems(item);
    item.expanded = !item.expanded;
  }

  getActivateClass(data: INavbarData): string {
    return this._router.url.includes(data.routerLink) ? 'active' : '';
  }

  shrinkItems(item: INavbarData): void {
    if (!this.multiple) {
      for (let modelItem of this.navData) {
        if (item !== modelItem && modelItem.expanded) {
          modelItem.expanded = false;
        }
      }
    }
  }
}
