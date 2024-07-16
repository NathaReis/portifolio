import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tela',
  templateUrl: './tela.component.html',
  styleUrls: ['./tela.component.scss']
})
export class TelaComponent implements OnInit {
  id: string = '';
  telaUrl: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.telaUrl = this.router.url.slice(0,-1);

    this.route.params.subscribe((params: any) => {
      this.id = String(params["id"]);
    });// Busca id

    window.addEventListener("storage", (event) => {
      if (event.key === "tela") {
        const resultado = event.newValue?.split(",");
        this.validarResultado(resultado);
      }
    });// Busca localStorage
  }

  validarResultado(resultado: any) {
    if(resultado[0] == this.id) {
      switch(resultado[1]) {
        case 'fechar':
          window.close();
          break
        case 'decrementoId':
          const novoId = +this.id - 1;
          this.router.navigate([`${this.telaUrl}${novoId}`]);
        break
      }
      localStorage.removeItem("tela");
    }
  }// Valida o localStorage
}
