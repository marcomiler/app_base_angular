import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { INavbarData } from '@components/sidebar/helper/helper';

@Component({
  selector: 'app-sublevel-menu',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, RouterModule],
  animations: [
    trigger('submenu', [
      state(
        'hidden',
        style({
          height: '0',
          overflow: 'hidden',
        })
      ),
      state(
        'visible',
        style({
          height: '*',
        })
      ),
      transition('visible <=> hidden', [
        style({
          overflow: 'hidden',
        }),
        animate('{{ transitionParams }}'),
      ]),
      transition('void => *', animate(0)),
    ]),
  ],
  template: `
    <ul
      *ngIf="collapsed && data.items && data.items.length > 0"
      class="sublevel-nav"
      [@submenu]="
        expanded
          ? {
              value: 'visible',
              params: {
                transitionParams: '400ms cubic-bezier(0.86, 0, 0.07, 1)',
                height: '*'
              }
            }
          : {
              value: 'hidden',
              params: {
                transitionParams: '400ms cubic-bezier(0.86, 0, 0.07, 1)',
                height: '0'
              }
            }
      "
    >
      <li *ngFor="let item of data.items" class="sublevel-nav-item">
        <a
          *ngIf="item.items && item.items.length > 0"
          (click)="handleClick(item)"
          class="sublevel-nav-link"
          [ngClass]="getActivateClass(item)"
        >
          <i class="sublevel-link-icon fa fa-circle"></i>
          <span *ngIf="collapsed" class="sublevel-link-text">{{
            item.label
          }}</span>
          <i
            *ngIf="item.items && collapsed"
            class="menu-collapse-icon"
            [ngClass]="
              !item.expanded ? 'fal fa-angle-right' : 'fal fa-angle-down'
            "
          ></i>
        </a>
        <a
          *ngIf="!item.items || (item.items && item.items.length === 0)"
          class="sublevel-nav-link"
          [routerLink]="[item.routerLink]"
          routerLinkActive="active-sublevel"
          [routerLinkActiveOptions]="{ exact: true }"
        >
          <i class="sublevel-link-icon fa fa-circle"></i>
          <span *ngIf="collapsed" class="sublevel-link-text">{{
            item.label
          }}</span>
        </a>
        <div *ngIf="item.items && item.items.length > 0">
          <app-sublevel-menu
            [collapsed]="collapsed"
            [multiple]="multiple"
            [expanded]="item.expanded"
          />
        </div>
      </li>
    </ul>
  `,
  styleUrls: ['./sidebar.component.scss'],
})
export class SublevelComponent {
  @Input() data: INavbarData = {
    routerLink: '',
    icon: '',
    label: '',
    items: [],
  };

  @Input() collapsed = false;
  @Input() animating: boolean | undefined;
  @Input() expanded: boolean | undefined;
  @Input() multiple: boolean = false;

  constructor(private _router: Router) {}

  handleClick(item: any): void {
    if (!this.multiple) {
      if (this.data.items && this.data.items.length > 0) {
        for (let modelItem of this.data.items) {
          if (item !== modelItem && modelItem.expanded) {
            modelItem.expanded = false;
          }
        }
      }
    }
    item.expanded = !item.expanded;
  }

  getActivateClass(item: INavbarData): string {
    return item.expanded && this._router.url.includes(item.routerLink)
      ? 'active-sublevel'
      : '';
  }
}
