import { Tela } from './../models/Tela';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TelaService {
  listaTelas: Tela[] = [];

  constructor() { }

  buscarTelas() {
    const session = sessionStorage.getItem("telas");
    if(session) {
      this.listaTelas = [];
      const telas = session.split(",");
      telas.map(numeroTela => {
        this.listaTelas.push({numero: numeroTela});
      })
    }
    return this.listaTelas;
  }

  fecharTela(tela: Tela) {
    localStorage.setItem("tela", `${tela.numero},fechar`);
    this.listaTelas = this.listaTelas.sort((a:Tela,b:Tela) => a.numero > b.numero ? 1 : -1);

    let novaLista: Tela[] = this.listaTelas.filter(el => {
        if(el.numero !== tela.numero) {
          if(el.numero < tela.numero) {
            return el;
          }
          else {
            localStorage.setItem("tela", `${el.numero},decrementoId`);
            el.numero--;
            return el;
          }
        }
        return
      }
    );
    this.listaTelas = novaLista;
    this.registrarSessionStorage();
    return this.listaTelas;
  }

  gerarTela() {
    if(this.listaTelas.length < 3) {
      const numero = this.listaTelas.length + 1;
      window.open(`../tela/${numero}`,"_blank","toolbar=yes,location=yes,directories=no, status=no, menubar=yes,scrollbars=yes, resizable=no,copyhistory=yes, width=500px,height=500px");
      const tela: Tela = {
        numero: numero
      }
      this.listaTelas.push(tela);
      this.registrarSessionStorage();
      return this.listaTelas;
    }
    return false;
  }

  registrarSessionStorage() {
    if(this.listaTelas.length > 0) {
      const numeros = this.listaTelas.map(el => el.numero);
      const numerosStr = numeros.join(",");
      sessionStorage.setItem("telas", numerosStr); 
      return;
    }
    sessionStorage.removeItem("telas");
  }
}
