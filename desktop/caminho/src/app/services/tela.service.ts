import { Tela } from './../models/Tela';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TelaService {
  listaTelas: Tela[] = [];

  constructor() { }

  buscarTelas() {
    return this.listaTelas;
  }

  fecharTela(id: String, numero: any) {
    let novaLista: Tela[] = [];
    for(let tela of this.listaTelas) {
      if(tela.id === id && tela.numero === numero) {
        tela.elemento.close();
      }
      else if (tela.numero > numero) {
        tela.numero--;
        novaLista.push(tela);
      }
    }
    this.listaTelas = novaLista;
    return this.listaTelas;
  }

  gerarTela() {
    const ids = this.listaTelas.map(element => element.id);
    const id = ids.length > 0 ? this.idAleatorio(ids) : this.idAleatorio();
    const numero = this.listaTelas.length + 1;
    const elemento = window.open("../tela","_blank","toolbar=yes,location=yes,directories=no, status=no, menubar=yes,scrollbars=yes, resizable=no,copyhistory=yes, width=500px,height=500px");
    elemento?.addEventListener("beforeunload", () => {
      alert('Aba prestes a ser fechada');
    });
    const tela: Tela = {
      id: id,
      numero: numero,
      elemento: elemento
    }
    this.listaTelas.push(tela);
    return this.listaTelas;
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
