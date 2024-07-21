import { Component, OnInit } from '@angular/core';

import { TelaService } from 'src/app/services/tela.service';
import { Tela } from 'src/app/models/Tela';

@Component({
  selector: 'app-relogio',
  templateUrl: './relogio.component.html',
  styleUrls: ['./relogio.component.scss']
})
export class RelogioComponent implements OnInit {
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

  configurarTempo(telas: number[] | undefined) {
    const retorno = telas ? `${telas},${this.minutos}` : `local,${this.minutos}`;
    setTimeout(() => {
      localStorage.setItem("tempo", retorno);
    }, 3000); // 3 segundos
  }

  onSubmit(form: any): void {
    if (form.valid) {
      const telas = form.value.telas;
      const tipo = form.value.tipo;

      if(telas) {
        if(telas.includes('todas')) {
          const numeroTelas = this.telas.map((tela: Tela) => tela.numero);
          this.telaService.navegar(tipo, numeroTelas);
          if(tipo == 'tempo') {
            this.configurarTempo(numeroTelas);
          }
        }// Se todas as telas 
        else if(telas){
          this.telaService.navegar(tipo, telas);
          if(tipo == 'tempo') {
            this.configurarTempo(telas);
          }
        }// Se alguma(s) tela(s)         
      }
      else {
        if(tipo == 'relogio') {
          this.telaService.gerarTelaEspecifica('relogio');
        }
        else {
          this.telaService.gerarTelaEspecifica('tempo');
          this.configurarTempo(undefined);
        }
      }// Se tela local
      this.limparForm();
    }
  }
}
