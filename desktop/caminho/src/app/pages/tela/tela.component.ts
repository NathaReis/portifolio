import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TelaService } from '../../services/tela.service';

@Component({
  selector: 'app-tela',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './tela.component.html',
  styleUrl: './tela.component.css'
})
export class TelaComponent implements OnInit {
  telaId: string = '';

  constructor(readonly telaService: TelaService) {}

  ngOnInit() {
    
  }
}
