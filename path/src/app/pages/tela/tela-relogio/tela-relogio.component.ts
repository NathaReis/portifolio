import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cidade } from 'src/app/models/Cidade';
import { Clima } from 'src/app/models/Clima';
import { TelaService } from 'src/app/services/tela.service';

@Component({
  selector: 'app-tela-relogio',
  templateUrl: './tela-relogio.component.html',
  styleUrls: ['./tela-relogio.component.scss']
})
export class TelaRelogioComponent implements OnInit {
  id: string = '';
  telaUrl: string = '';

  nomeCidade = 'Sete Lagoas';
  chaveApi = 'af771379a3ebcb50459501b069cdebc8';
  clima: Clima = {src: '', cep: '', temperatura: '', descricao: ''};
  hora: string = '00';
  minuto: string = '00';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private telaService: TelaService
  ) { }

  async ngOnInit() {
    this.telaUrl = this.router.url.slice(0,-1);

    this.route.params.subscribe((params: any) => {
      this.id = String(params["id"]);
    });// Busca id

    window.addEventListener("storage", (event) => {
      if (event.key === "tela") {
        const resultado = event.newValue?.split(",");
        this.telaService.eventosLocalStorage(resultado, this.id, this.telaUrl, this.router);
      }
    });// Busca localStorage
    this.buscarHorario();
  }

  async buscarCidade() {
    try {
      const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURI(this.nomeCidade)}&appid=${this.chaveApi}`;
      const resultado = await fetch(apiUrl);
      const resultadoUrl = resultado.url;

      const dados = await fetch(resultadoUrl)
      .then(resposta => resposta.json())
      .then(dados => dados)
      .catch(err => console.error(err));

      return dados[0];      
    } catch (erro) {
      return erro;
    }
  }

  async buscarClima() {
    try {
      const dadosCidade: Cidade = await this.buscarCidade();

      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${dadosCidade.lat}&lon=${dadosCidade.lon}&appid=${this.chaveApi}&units=metric&lang=pt_br`;
      const resultado = await fetch(apiUrl);
      const resultadoUrl = resultado.url;

      const dados = await fetch(resultadoUrl)
      .then(resposta => resposta.json())
      .then(dados => dados)
      .catch(err => console.error(err));

      const informacao = { dados: dados, dadosCidade: dadosCidade }

      return informacao;      
    } catch (erro) {
      return erro;
    }
  }

  async formatarInformacaoClima() {
    try {
      const informacao: any = await this.buscarClima();
      this.clima = {
        src:`http://openweathermap.org/img/wn/${informacao.dados.weather[0].icon}@2x.png`,
        temperatura: `${informacao.dados.main.temp} C°`,
        descricao: String(informacao.dados.weather[0].description).toUpperCase(),
        cep: `${informacao.dadosCidade.name} ${informacao.dadosCidade.country}`,      
      };
      setTimeout(() => {
        this.formatarInformacaoClima();
      }, 600000) // 10 minutos
      return true;     
    } catch (erro) {
      this.clima = {src: '', cep: '', temperatura: '', descricao: ''};
      return erro;
    }
  }

  formatarHora(hora: number) {
    return hora < 10 ? `0${hora}` : `${hora}`;
  }

  async buscarHorario() {
    try {
      await this.formatarInformacaoClima();
      setInterval(() => {
        const agora = new Date();
        this.hora = this.formatarHora(agora.getHours());
        this.minuto = this.formatarHora(agora.getMinutes());
      }, 1000); // 1 minuto
      return;
    } catch (erro) {
      return erro;
    }
  }
}
