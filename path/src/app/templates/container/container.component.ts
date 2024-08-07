import { Component, Input, OnInit } from '@angular/core';

import { TemaService } from 'src/app/services/tema.service';

@Component({
  selector: 'path-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  @Input() background: string = 'padrao';

  constructor(
    private temaService: TemaService
  ) {}

  ngOnInit(): void {
    const temaSalvo = localStorage.getItem('tema') || 'claro';
    this.temaService.configTema(temaSalvo);
  }
}
