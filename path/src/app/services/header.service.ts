import { Injectable } from '@angular/core';
import { Header } from '../models/Header';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor() { }

  pages: Header[] = [
    {
      label: 'Sonoplastia',
      rota: '/casa',
      icon: 'home',
      class: 'logo'
    },
    {
      label: 'Relógio',
      rota: '/casa/relogio',
      icon: 'timer'
    }
  ]

  buscarHeader() {
    return this.pages;
  }
}
