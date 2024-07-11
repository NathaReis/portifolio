import { Component } from '@angular/core';
import { TelaService } from '../../services/tela.service';

@Component({
  selector: 'app-casa',
  standalone: true,
  imports: [],
  templateUrl: './casa.component.html',
  styleUrl: './casa.component.css'
})
export class CasaComponent {
  constructor(readonly telaService: TelaService) {}

  gerarTela() {
    this.telaService.gerarTela();
  }
}
