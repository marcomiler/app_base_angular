import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { PruebaComponent } from '@ui/users-page/prueba.componet';
import { getState, subscribe } from '../../user-store';

@Component({
  selector: 'app-users-list-page',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    PruebaComponent,
  ],
  templateUrl: './users-list-page.component.html',
  styleUrls: ['./users-list-page.component.scss'],
})
export class UsersListPageComponent implements OnInit {
  private _http = inject(HttpClient);

  public value: number = getState().count;
  public title: string = getState().title;
  private increment = getState().increment;
  private replaceTitle = getState().changeTitle;

  ngOnInit(): void {
    subscribe((state) => {
      this.value = state.count;
      this.title = state.title;
    });
  }

  incrementNumber(): void {
    this.increment(1);
  }

  changeTitle(value: string): void {
    this.replaceTitle(value);
  }

  HandleClick(): void {
    this._http
      .get('https://jsonplaceholder.typicode.com/todos/1')
      .subscribe((resp) => {});
  }
}
