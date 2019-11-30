import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';
import { TextMaskModule } from 'angular2-text-mask';

import { ViaCepService } from '../service/viacep.service';
import { TransportadoraService } from '../service/transportadora.service';

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
    BrowserAnimationsModule,
    AppRoutingModule,
    TextMaskModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    FormsModule
  ],
  providers: [
    ViaCepService,
    TransportadoraService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
