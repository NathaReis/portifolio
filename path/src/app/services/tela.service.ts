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
    const sessionNumeros = sessionStorage.getItem("numeros");
    const sessionRotas = sessionStorage.getItem("rotas");

    if(sessionNumeros && sessionRotas) {
      this.listaTelas = [];
      const numeros = sessionNumeros.split(",");
      const rotas = sessionRotas.split(",");

      for(let posicao in numeros) {
        this.listaTelas.push({
          numero: numeros[posicao],
          rota: rotas[posicao]
        });
      }

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
        numero: numero,
        rota: 'tela',
      }
      this.listaTelas.push(tela);
      this.registrarSessionStorage();
      return this.listaTelas;
    }
    return false;
  }

  navegar(rota: string, telas: string[]) {
    telas.map((numeroTela: string) => {
      this.listaTelas.map((tela: Tela) => {
        if(tela.numero == numeroTela) {
          tela.rota = rota;
        }
      })
      const rotaUrl = rota === 'tela' ? `tela/${numeroTela}` : `tela/${rota}/${numeroTela}`;
      localStorage.setItem("tela", `${numeroTela},${rotaUrl}`);
    })
    this.registrarSessionStorage();
  }

  registrarSessionStorage() {
    if(this.listaTelas.length > 0) {
      const numeros = this.listaTelas.map(el => el.numero);
      const rotas = this.listaTelas.map(el => el.rota);

      const numerosStr = numeros.join(",");
      const rotasStr = rotas.join(",");

      sessionStorage.setItem("numeros", numerosStr); 
      sessionStorage.setItem("rotas", rotasStr); 
      return;
    }
    sessionStorage.removeItem("numeros");
    sessionStorage.removeItem("rotas");
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
        default:
          const rotaUrl = resultado[1];
          router.navigate([`${rotaUrl}`]);
      }
      localStorage.removeItem("tela");
    }
  }// Valida o localStorage
}
