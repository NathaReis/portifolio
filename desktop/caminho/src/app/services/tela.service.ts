import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TelaService {

  constructor() { }

  gerarTela() {
    window.open("../tela","_blank","toolbar=yes,location=yes,directories=no, status=no, menubar=yes,scrollbars=yes, resizable=no,copyhistory=yes, width=500px,height=500px");
  }

  idAleatorio(ids?: String[]) {
    let letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let plat_id = letters.charAt(Math.floor(Math.random() * letters.length)) + (Math.random() + 1).toString(36).substr(2, 9);

    if(ids) {
        for(let id of ids) {
            if(id == plat_id) {
                plat_id = this.idAleatorio(ids);
                break;
            }
        }
    }

    return plat_id;
  }
}
