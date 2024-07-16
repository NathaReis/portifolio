import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-relogio',
  templateUrl: './relogio.component.html',
  styleUrls: ['./relogio.component.scss']
})
export class RelogioComponent implements OnInit {
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
