import { Routes } from '@angular/router';
import { TelaComponent } from './pages/tela/tela.component';
import { CasaComponent } from './pages/casa/casa.component';
import { RelogioComponent } from './pages/relogio/relogio.component';
import { CasaRelogioComponent } from './pages/casa/casa-relogio/casa-relogio.component';

export const routes: Routes = [
    {
        path: '', redirectTo: 'casa', pathMatch: 'full'
    },
    {
        path: 'casa', component: CasaComponent
    },
    {
        path: 'casa/relogio', component: CasaRelogioComponent
    },
    {
        path: 'tela/:id', component: TelaComponent
    },
    {
        path: 'relogio/:id', component: RelogioComponent
    }
];
