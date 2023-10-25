import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-users-list-page',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './users-list-page.component.html',
  styleUrls: ['./users-list-page.component.scss'],
})
export class UsersListPageComponent {}
