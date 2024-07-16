import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CasaComponent } from './pages/casa/casa.component';
import { RelogioComponent } from './pages/casa/relogio/relogio.component';
import { TelaComponent } from './pages/tela/tela.component';
import { TelaRelogioComponent } from './pages/tela/tela-relogio/tela-relogio.component';

const routes: Routes = [
  {path: '', redirectTo: 'casa', pathMatch: 'full'},
  {path: 'casa', component: CasaComponent},
  {path: 'casa/relogio', component: RelogioComponent},
  {path: 'tela/:id', component: TelaComponent},
  {path: 'tela/relogio/:id', component: TelaRelogioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }