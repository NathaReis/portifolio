import { Routes } from '@angular/router';
import { TelaComponent } from './pages/tela/tela.component';
import { CasaComponent } from './pages/casa/casa.component';

export const routes: Routes = [
    {
        path: 'tela', component: TelaComponent
    },
    {
        path: 'casa', component: CasaComponent
    },
    {
        path: '', redirectTo: 'casa', pathMatch: 'full'
    }
];
