import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CadastroComponent } from '../crud/cadastro/cadastro.component';
import { AppRoutingModule } from './/app-routing.module';
import { ManutencaoComponent } from '../principal/manutencao/manutencao.component';

@NgModule({
  declarations: [
    AppComponent,
    CadastroComponent,
    ManutencaoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
