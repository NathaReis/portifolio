import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TelaService } from 'src/app/services/tela.service';

@Component({
  selector: 'app-tela-relogio',
  templateUrl: './tela-relogio.component.html',
  styleUrls: ['./tela-relogio.component.scss']
})
export class TelaRelogioComponent implements OnInit {
  id: string = '';
  telaUrl: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private telaService: TelaService
  ) { }

  ngOnInit() {
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
  }

}
