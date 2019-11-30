import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import { ViaCepService } from '../../service/viacep.service';

import { Endereco } from 'src/model/endereco';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})

export class CadastroComponent {

  cepMascara = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

  buscaEndereco: Endereco;

  constructor(
    private toastr: ToastrService,
    private viaCepService: ViaCepService
  ) { }

  pesquisaCep(cep: string) {
    cep = cep.replace('-', '');

    if (this.validaCep(cep)) {
      this.viaCepService.getEndereco(cep)
        .subscribe(
          endereco => {
            if (endereco.erro === true) {
              this.buscaEndereco = undefined;
              this.toastr.warning('Cep não encontrado', 'Erro');
            } else {
              this.buscaEndereco = endereco;
              console.log(this.buscaEndereco.logradouro);
              console.log(this.buscaEndereco.uf);
            }
          },
          error => {
            this.toastr.error('Error: ${error.message}.', 'Erro');
            this.buscaEndereco = undefined;
          }
        );
    } else {
      this.toastr.error('Insira um cep válido.', 'Erro');
      this.buscaEndereco = undefined;
    }
  }

  validaCep(cep: string): boolean {
    if (cep.length === 8) {
      return true;
    }
    return false;
  }
}
