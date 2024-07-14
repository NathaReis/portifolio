import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-casa-relogio',
  templateUrl: './casa-relogio.component.html',
  styleUrl: './casa-relogio.component.css'
})
export class CasaRelogioComponent implements OnInit{
  meuForm: FormData = new FormData();

  ngOnInit() {
    const $form = document.querySelector("form");
    if($form) {
      this.meuForm = new FormData($form);
    }

    $form?.addEventListener("submit", (evento) => {
      evento.preventDefault();
      
    })
  }
}
