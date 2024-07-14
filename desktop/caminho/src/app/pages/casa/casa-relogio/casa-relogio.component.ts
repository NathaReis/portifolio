import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-casa-relogio',
  templateUrl: './casa-relogio.component.html',
  styleUrl: './casa-relogio.component.css'
})
export class CasaRelogioComponent implements OnInit{
  form: FormData = new FormData();

  ngOnInit() {
    const $form = document.querySelector("form");
    if($form) {
      this.form = new FormData($form);
    }
  }

  selecionadoTipo() {
    console.log(this.form.getAll("tipo"));
  }
}
