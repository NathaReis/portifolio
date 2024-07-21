import { Component } from '@angular/core';
import { Header } from 'src/app/models/Header';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(readonly headerService: HeaderService) {};

  get header(): Header[] {
    return this.headerService.buscarHeader;
  }
}
