import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CasaComponent } from './pages/casa/casa.component';
import { TelaRelogioComponent } from './pages/tela/tela-relogio/tela-relogio.component';
import { RelogioComponent } from './pages/casa/relogio/relogio.component';
import { TelaComponent } from './pages/tela/tela.component';

@NgModule({
  declarations: [
    AppComponent,
    CasaComponent,
    RelogioComponent,
    TelaComponent,
    TelaRelogioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
