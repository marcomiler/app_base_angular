import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-users-list-page',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './users-list-page.component.html',
  styleUrls: ['./users-list-page.component.scss'],
})
export class UsersListPageComponent {
  private _http = inject(HttpClient);

  HandleClick(): void {
    this._http
      .get('https://jsonplaceholder.typicode.com/todos/1')
      .subscribe((resp) => {
        console.log('RESP: ', resp);
      });
  }
}
