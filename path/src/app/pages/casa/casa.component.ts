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
