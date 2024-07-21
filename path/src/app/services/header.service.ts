import { Injectable } from '@angular/core';
import { Header } from '../models/Header';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor() { }

  pages: Header[] = [
    {
      rota: '/casa',
      icon: 'home',
      class: 'logo'
    },
    {
      rota: '/casa/relogio',
      icon: 'timer'
    }
  ]

  buscarHeader(): Header[] {
    return this.pages;
  }
}
