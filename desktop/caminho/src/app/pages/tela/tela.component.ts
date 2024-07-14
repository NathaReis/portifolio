import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-tela',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './tela.component.html',
  styleUrl: './tela.component.css'
})
export class TelaComponent implements OnInit {
  id: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
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
          this.router.navigate([`tela/${+this.id - 1}`]);
        break
      }
      localStorage.removeItem("tela");
    }
  }// Valida o localStorage
}
