import { Component } from '@angular/core';
import { TelaService } from '../../services/tela.service';
import { Tela } from '../../models/Tela';

@Component({
  selector: 'app-casa',
  standalone: true,
  imports: [],
  templateUrl: './casa.component.html',
  styleUrl: './casa.component.css'
})
export class CasaComponent {
  telas: Tela[] = [];

  constructor(readonly telaService: TelaService) {}

  buscarTelas() {
    this.telas = this.telaService.buscarTelas();
  }

  fecharTela() {
    this.telas = this.telaService.fecharTela('oi',1);
  }

  gerarTela() {
    this.telas = this.telaService.gerarTela();
  }
}