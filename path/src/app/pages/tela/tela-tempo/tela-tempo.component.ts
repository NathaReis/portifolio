import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TelaService } from 'src/app/services/tela.service';
import { Cidade } from 'src/app/models/Cidade';
import { Clima } from 'src/app/models/Clima';

@Component({
  selector: 'app-tela-tempo',
  templateUrl: './tela-tempo.component.html',
  styleUrls: ['./tela-tempo.component.scss']
})
export class TelaTempoComponent implements OnInit {
  id: string = '';
  telaUrl: string = '';

  nomeCidade = 'Sete Lagoas';
  chaveApi = 'af771379a3ebcb50459501b069cdebc8';
  clima: Clima = {src: '', cep: '', temperatura: '', descricao: ''};
  hora: string = '00';
  minuto: string = '00';
  segundo: number = 59;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private telaService: TelaService
  ) { }

  ngOnInit(): void {
    this.telaUrl = this.router.url.slice(0,-1);

    this.route.params.subscribe((params: any) => {
      this.id = String(params["id"]);
    });// Busca id

    window.addEventListener("storage", (event) => {
      const resultado = event.newValue?.split(",");
      switch(event.key) {
        case 'tela':
          this.telaService.eventosLocalStorage(resultado, this.id, this.telaUrl, this.router);
          break 
        case 'tempo':
          this.buscarHorario(resultado);
          break
      }
    });// Busca localStorage

    this.buscarSessionStorage();

    this.formatarInformacaoClima();
  }

  buscarSessionStorage(): void {
    const storage = sessionStorage.getItem("tempo");
    if(storage) {
      const arrayDados = storage.split(",");
      this.buscarHorario(arrayDados);
    }
  }

  async buscarCidade() {
    const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURI(this.nomeCidade)}&appid=${this.chaveApi}`;
    const resultado = await fetch(apiUrl);
    const resultadoUrl = resultado.url;

    const dados: any = await fetch(resultadoUrl)
    .then(resposta => resposta.json())
    .catch(() => false);

    return dados[0];      
  }

  async buscarClima() {
    const dadosCidade: Cidade = await this.buscarCidade();

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${dadosCidade.lat}&lon=${dadosCidade.lon}&appid=${this.chaveApi}&units=metric&lang=pt_br`;
    const resultado = await fetch(apiUrl);
    const resultadoUrl = resultado.url;

    const dados = await fetch(resultadoUrl)
    .then(resposta => resposta.json())
    .catch(() => false);

    const informacao = dados ? { dados: dados, dadosCidade: dadosCidade } : false;
    return informacao;   
  }

  async formatarInformacaoClima() {
      const informacao: any = await this.buscarClima();

      if(informacao) {
        this.clima = {
          src:`http://openweathermap.org/img/wn/${informacao.dados.weather[0].icon}@2x.png`,
          temperatura: `${informacao.dados.main.temp} C°`,
          descricao: String(informacao.dados.weather[0].description).toUpperCase(),
          cep: `${informacao.dadosCidade.name} ${informacao.dadosCidade.country}`,      
        };
      }

      setTimeout(() => {
        this.formatarInformacaoClima();
      }, 600000) // 10 minutos
  }

  formatarHora(hora: number) {
    return hora < 10 ? `0${hora}` : `${hora}`;
  }

  registrarHoraMinuto() {
    sessionStorage.setItem("tempo", `${this.id},${this.hora}:${this.minuto}`);
  } 

  buscarHoraMinuto(resultado: any): void {
    const posHorario = +resultado.length - 1;
    const horario = resultado[posHorario].split(":");
    this.hora = this.formatarHora(+horario[0]);
    this.minuto = this.formatarHora(+horario[1]);
    this.registrarHoraMinuto();
  }

  contagemDeMinuto(): void {
    setTimeout(() => {
      this.minuto = this.formatarHora(+this.minuto - 1);
      if(+this.minuto < 0 && +this.hora > 0) {
        this.hora = this.formatarHora(+this.hora - 1);
        this.minuto = '59';
      }
      else if(+this.minuto <= 0 && +this.hora <= 0) {
        this.hora = '00';
        this.minuto = '00';
      }
      localStorage.setItem("tempo", `${this.id},${this.hora}:${this.minuto}`);
      localStorage.removeItem("tempo");
    }, 60000);
  }

  buscarHorario(resultado: any) {
    if(resultado.includes(this.id)) {
      this.buscarHoraMinuto(resultado);
      this.contagemDeMinuto();
      localStorage.removeItem("tempo");
    }
  }
}