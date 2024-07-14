import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TelaComponent } from './tela/tela.component';
import { RelogioComponent } from './relogio/relogio.component';
import { CasaModule } from './casa/casa.module';
import { RouterOutlet } from '@angular/router';



@NgModule({
  declarations: [TelaComponent, RelogioComponent],
  imports: [
    CommonModule,
    CasaModule,
  ],
  exports: [TelaComponent, RelogioComponent]
})
export class PagesModule { }
