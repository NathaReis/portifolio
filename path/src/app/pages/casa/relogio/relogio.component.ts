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
  telaSelecionada: string[] = [];
  tipoSelecionado = 'relogio';
  minutos = '';
  telas: Tela[] = [];

  constructor(private telaService: TelaService) { }

  ngOnInit(): void {
    this.telas = this.telaService.buscar();
  }

  toggleTodasTelas(ativar: boolean): void {
    if(ativar) {
      this.telaSelecionada = ['todas'];
    }
    else {
      this.telaSelecionada = this.telaSelecionada.filter((tela: string) => tela !== 'todas');
    }
  }

  limparForm(): void {
    this.telaSelecionada = [];
    this.tipoSelecionado = 'relogio';
    this.minutos = '';
  }

  onSubmit(form: any): void {
    if (form.valid) {
      if(form.value.telas) {
        if(form.value.telas.includes('todas')) {
          const contarTelas = this.telas.map((tela: Tela) => tela.numero);
          this.telaService.navegar(form.value.tipo, contarTelas);
        }// Se todas as telas 
        else if(form.value.telas){
          this.telaService.navegar(form.value.tipo, form.value.telas);
        }// Se uma tela         
      }
      else {
        this.telaService.gerarTelaEspecifica('relogio');
      }// Se tela local
      this.limparForm();
    }
  }
}
