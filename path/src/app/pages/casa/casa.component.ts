import { Component, OnInit } from '@angular/core';

import { TelaService } from 'src/app/services/tela.service';
import { Tela } from 'src/app/models/Tela';
import { TemaService } from 'src/app/services/tema.service';

@Component({
  selector: 'app-casa',
  templateUrl: './casa.component.html',
  styleUrls: ['./casa.component.scss']
})
export class CasaComponent implements OnInit {
  telas: Tela[] = [];
  tema: string = '';

  constructor(
    private telaService: TelaService,
    private temaService: TemaService
  ) {}

  ngOnInit(): void {
    this.buscarTelas();
    const temaSalvo = localStorage.getItem('tema') || 'claro';
    this.tema = temaSalvo;
    this.temaService.configTema(temaSalvo);
  }

  buscarTelas(): void {
    this.telas = this.telaService.buscar();
  }

  fecharTela(numero: number): void {
    this.telas = this.telaService.fechar(numero);
  }

  voltarTela(numero: number): void {
    this.telaService.navegar('tela',[numero]);
  }

  gerarTela(): void {
    const result: Tela[] | undefined = this.telaService.gerar();
    if(result) {
      this.telas = result
    }
    else {
      alert("Limite de telas alcançado!");
    }
  }

  configurarTema() {
    this.temaService.configTema(this.tema);
  }
}
