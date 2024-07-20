import { Component, OnInit } from '@angular/core';
import { Header } from 'src/app/models/Header';
import { Tela } from 'src/app/models/Tela';
import { HeaderService } from 'src/app/services/header.service';
import { TelaService } from 'src/app/services/tela.service';

@Component({
  selector: 'app-casa',
  templateUrl: './casa.component.html',
  styleUrls: ['./casa.component.scss']
})
export class CasaComponent implements OnInit {
  telas: Tela[] = [];
  adicionarClass: string = '';

  constructor(
    private telaService: TelaService,
    private headerService: HeaderService
  ) {}

  ngOnInit(): void {
    this.buscarTelas();
    this.configurarAdicionarClass();
  }

  configurarAdicionarClass() {
    const classe = `primeiro${this.telas.length}`;
    this.adicionarClass = classe;
  }

  buscarHeader(): Header[] {
    return this.headerService.buscarHeader();
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
