import { Component } from '@angular/core';

@Component({
  selector: 'app-casa',
  standalone: true,
  imports: [],
  templateUrl: './casa.component.html',
  styleUrl: './casa.component.css'
})
export class CasaComponent {
  gerarTela() {
    window.open("http://localhost:4200/tela","_blank","toolbar=yes,location=yes,directories=no, status=no, menubar=yes,scrollbars=yes, resizable=no,copyhistory=yes, width=500px,height=500px");
  }
}
