import { Routes } from '@angular/router';
import { TelaComponent } from './pages/tela/tela.component';
import { CasaComponent } from './pages/casa/casa.component';
import { RelogioComponent } from './pages/relogio/relogio.component';

export const routes: Routes = [
    {
        path: '', redirectTo: 'casa', pathMatch: 'full'
    },
    {
        path: 'casa', component: CasaComponent
    },
    {
        path: 'tela/:id', component: TelaComponent
    },
    {
        path: 'relogio/:id', component: RelogioComponent
    }
];
