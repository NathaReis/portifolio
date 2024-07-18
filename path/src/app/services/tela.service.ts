import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Tela } from '../models/Tela';

@Injectable({
  providedIn: 'root'
})
export class TelaService {
  listaTelas: Tela[] = [];

  constructor() { }

  buscar() {
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

  fechar(tela: Tela) {
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

  gerar() {
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

  navegar(rota: string, telas: string[]) {
    telas.map((tela: string) => {
      const rotaUrl = `tela/${rota}/${tela}`;
      localStorage.setItem("tela", `${tela},rota,${rotaUrl}`);
    })
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

  eventosLocalStorage(resultado: any, id: string, telaUrl: string, router: Router) {
    if(resultado[0] == id) {
      switch(resultado[1]) {
        case 'fechar':
          window.close();
          break
        case 'decrementoId':
          const novoId = +id - 1;
          router.navigate([`${telaUrl}${novoId}`]);
          break
        case 'rota':
          const rotaUrl = resultado[2];
          router.navigate([`${rotaUrl}`]);
        break
      }
      localStorage.removeItem("tela");
    }
  }// Valida o localStorage
}
