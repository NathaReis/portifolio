import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TelaService } from '../../services/tela.service';

@Component({
  selector: 'app-tela',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './tela.component.html',
  styleUrl: './tela.component.css'
})
export class TelaComponent implements OnInit {
  telaId: string = '';

  constructor(readonly telaService: TelaService) {}

  ngOnInit(): void {
    const telasStr = localStorage.getItem("telas");
    if(telasStr) {
      const id = this.telaService.idAleatorio(telasStr.split(','));
      const novaLista = telasStr + ',' + id;
      localStorage.setItem("telas",novaLista);
      this.telaId = id;
    }
    else {
      const id = this.telaService.idAleatorio();
      localStorage.setItem("telas", id);
      this.telaId = id;
    }
  }

  gerarLista() {

  }
}
