import { IconeRotaService } from './icone-rota.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Tela } from '../models/Tela';

@Injectable({
  providedIn: 'root'
})
export class TelaService {
  listaTelas: Tela[] = [];

  constructor(readonly iconeRotaService: IconeRotaService) { }

  buscar(): Tela[] {
    const sessionNumeros = sessionStorage.getItem("numeros");
    const sessionRotas = sessionStorage.getItem("rotas");

    if(sessionNumeros && sessionRotas) {
      this.listaTelas = [];
      const numeros = sessionNumeros.split(",");
      const rotas = sessionRotas.split(",");

      for(let posicao in numeros) {
        this.listaTelas.push({
          numero: numeros[posicao],
          icone: rotas[posicao]
        });
      }

    }
    return this.listaTelas;
  }

  ordenarLista(lista: Tela[]): Tela[] {
    return lista.sort((a:Tela,b:Tela) => a.numero > b.numero ? 1 : -1);
  }

  excluirTelaLista(tela: Tela): Tela[] {
    localStorage.setItem("tela", `${tela.numero},fechar`);// Envia a mensagem para tela se fechar
    let novaLista: Tela[] = this.listaTelas.filter(el => {
      if(el.numero !== tela.numero) {
        if(el.numero < tela.numero) {
          return el;
        }
        localStorage.setItem("tela", `${el.numero},decrementoId`);// Envia comando para decrementar id da tela
        el.numero--;
        return el;
      }// Remove tela da lista
      return
    });
    return novaLista;
  }

  fechar(tela: Tela): Tela[] {
    this.listaTelas = this.ordenarLista(this.listaTelas)
    this.listaTelas = this.excluirTelaLista(tela);
    this.registrarSessionStorage();
    return this.listaTelas;
  }

  gerar(): Tela[] | boolean {
    if(this.listaTelas.length < 3) {
      const numero = this.listaTelas.length + 1;
      window.open(`../tela/${numero}`,"_blank","toolbar=yes,location=yes,directories=no, status=no, menubar=yes,scrollbars=yes, resizable=no,copyhistory=yes, width=500px,height=500px");
      const tela: Tela = {
        numero: numero,
        icone: this.iconeRotaService.iconeRota('tela'),
      }
      this.listaTelas.push(tela);
      this.registrarSessionStorage();
      return this.listaTelas;
    }
    return false;
  }

  gerarTelaEspecifica(rota: string) {
    window.open(`../tela/${rota}/local`,"_blank","toolbar=yes,location=yes,directories=no, status=no, menubar=yes,scrollbars=yes, resizable=no,copyhistory=yes, width=500px,height=500px");
  }

  navegar(rota: string, telas: string[]): void {
    telas.map((numeroTela: string) => {
      this.listaTelas.map((tela: Tela) => {
        if(tela.numero == numeroTela) {
          tela.icone = this.iconeRotaService.iconeRota(rota);
        }
      })
      const rotaUrl = rota === 'tela' ? `tela/${numeroTela}` : `tela/${rota}/${numeroTela}`;
      localStorage.setItem("tela", `${numeroTela},${rotaUrl}`);
    })
    this.registrarSessionStorage();
  }

  registrarSessionStorage(): void {
    if(this.listaTelas.length > 0) {
      const numeros = this.listaTelas.map(el => el.numero);
      const rotas = this.listaTelas.map(el => el.icone);

      const numerosStr = numeros.join(",");
      const rotasStr = rotas.join(",");

      sessionStorage.setItem("numeros", numerosStr); 
      sessionStorage.setItem("rotas", rotasStr); 
      return;
    }
    sessionStorage.removeItem("numeros");
    sessionStorage.removeItem("rotas");
  }

  eventosLocalStorage(resultado: any, id: string, telaUrl: string, router: Router): void {
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
