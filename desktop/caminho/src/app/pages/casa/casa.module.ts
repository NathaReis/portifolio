import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CasaComponent } from './casa.component';
import { CasaRelogioComponent } from './casa-relogio/casa-relogio.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@NgModule({
  declarations: [CasaComponent,CasaRelogioComponent],
  imports: [
    CommonModule,
    NgFor, 
    RouterLink,
    MatButtonToggleModule
  ],
  exports: [CasaComponent,CasaRelogioComponent]
})
export class CasaModule { }
