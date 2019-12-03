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
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule, GrowlModule, CheckboxModule } from 'primeng/primeng';
import { ToastModule } from 'primeng/toast';

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
    FormsModule,
    ConfirmDialogModule,
    GrowlModule,
    CheckboxModule,
    ToastModule
  ],
  providers: [
    ViaCepService,
    TransportadoraService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
