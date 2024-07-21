import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IconeRotaService {
  iconeRota(rota: string): string {
    switch(rota) {
      case 'relogio':
        return 'timer';
      case 'tela':
        return 'villa';
      default: 
        return 'tv';
    }
  }
}
