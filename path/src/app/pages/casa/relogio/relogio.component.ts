import { Component, OnInit } from '@angular/core';
import { Tela } from 'src/app/models/Tela';
import { TelaService } from 'src/app/services/tela.service';

@Component({
  selector: 'app-relogio',
  templateUrl: './relogio.component.html',
  styleUrls: ['./relogio.component.scss']
})
export class RelogioComponent implements OnInit {
  meuForm: FormData = new FormData();
  telaSelecionada = 'todas';
  tipoSelecionado = 'relogio';
  minutos = '';
  telas: Tela[] = [];

  constructor(private telaService: TelaService) { }

  ngOnInit() {
    this.telas = this.telaService.buscarTelas();
  }

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Form data is valid:', form.value);
    }
  }
}
