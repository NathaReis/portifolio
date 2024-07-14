import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CasaComponent } from './casa.component';
import { CasaRelogioComponent } from './casa-relogio/casa-relogio.component';

@NgModule({
  declarations: [CasaComponent,CasaRelogioComponent],
  imports: [
    CommonModule,
    NgFor, 
    RouterLink,
  ],
  exports: [CasaComponent,CasaRelogioComponent]
})
export class CasaModule { }
