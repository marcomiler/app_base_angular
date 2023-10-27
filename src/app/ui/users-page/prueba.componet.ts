import { Component, OnInit } from '@angular/core';

import { getState, subscribe } from './user-store';

@Component({
  selector: 'app-prueba',
  standalone: true,
  imports: [],
  template: `<ul>
    <li>PRUEBA - VALOR: {{ value }}</li>
    <li>PRUEBA - TITLE: {{ title }}</li>
  </ul>`,
})
export class PruebaComponent implements OnInit {
  value: number = getState().count;
  title: string = getState().title;

  ngOnInit(): void {
    subscribe((state) => {
      this.value = state.count;
      this.title = state.title;
    });
  }
}
