import { Component, OnInit } from '@angular/core';
import { TelaService } from '../../services/tela.service';
import { Tela } from '../../models/Tela';
import { CasaModule } from './casa.module';

@Component({
  selector: 'app-casa',
  templateUrl: './casa.component.html',
  styleUrl: './casa.component.css'
})
export class CasaComponent implements OnInit{
  telas: Tela[] = [];

  constructor(private telaService: TelaService) {}

  ngOnInit() {
    this.buscarTelas();
  }

  buscarTelas() {
    this.telas = this.telaService.buscarTelas();
  }

  fecharTela(tela: Tela) {
    this.telas = this.telaService.fecharTela(tela);
  }

  gerarTela() {
    const result: any = this.telaService.gerarTela();
    if(result) {
      this.telas = result
    }
    else {
      alert("Limite de telas alcançado!");
    }
  }
}