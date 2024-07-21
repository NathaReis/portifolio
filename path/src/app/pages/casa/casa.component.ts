import { Component, OnInit } from '@angular/core';

import { Tela } from 'src/app/models/Tela';
import { TelaService } from 'src/app/services/tela.service';

@Component({
  selector: 'app-casa',
  templateUrl: './casa.component.html',
  styleUrls: ['./casa.component.scss']
})
export class CasaComponent implements OnInit {
  telas: Tela[] = [];
  adicionarClass: string = '';

  constructor(private telaService: TelaService) {}

  ngOnInit(): void {
    this.buscarTelas();
    this.configurarAdicionarClass();
  }

  configurarAdicionarClass() {
    const classe = `primeiro${this.telas.length}`;
    this.adicionarClass = classe;
  }

  buscarTelas(): void {
    this.telas = this.telaService.buscar();
  }

  fecharTela(tela: Tela): void {
    this.telas = this.telaService.fechar(tela);
    this.configurarAdicionarClass();
  }

  voltarTela(tela: Tela): void {
    this.telaService.navegar('tela',[tela.numero]);
  }

  gerarTela(): void {
    const result: any = this.telaService.gerar();
    if(result) {
      this.telas = result
      this.configurarAdicionarClass();
    }
    else {
      alert("Limite de telas alcançado!");
    }
  }
}
